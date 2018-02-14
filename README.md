# React MathJax

React component to display math formulas written in AsciiMath or TeX.


This includes the following changes:
* Text object which wraps a div that will re-render $$ escaped text characters when it's text prop changes
* Context object is a gate, i.e. it does not render its children until the MathJax script has finished loading
  * this avoids the case when a MathJax.Node attempts to render before the Hub is available
    * also added an Error which is thrown when MathJax.Node can't find a Hub
  * there's a loading props one can use to specify children before loading
  * one can also disable this behavior completely by setting noGate props to true
* added an onLoad props to Context which triggers when the MathJax script finishes loading
* cleanup of the MathJax.Hub.Queue calls to re-render a particular script tag

![Example of usage](/example.gif)
Based on the [react-mathjax](https://github.com/SamyPesse/react-mathjax) from SamyPesse. The main difference is in updated deps, syntax and extended options (delay of rendering and support for AsciiMath).

## Install
```
npm install https://github.com/wko27/react-mathjax --save
```

## Usage

# Inline display of AsciiMath wrapped in delimiters

```jsx
import MathJax from 'react-mathjax'

const ascii = 'U = 1/(R_(si) + sum_(i=1)^n(s_n/lambda_n) + R_(se))'
const content = `This can be dynamic text (e.g. user-entered) text with ascii math embedded in $$ symbols like $$${ascii}$$`

module.exports = () => {
    return (
        <MathJax.Context
            input='ascii'
            onLoad={ () => console.log("Loaded MathJax script!") }
            onError={ (MathJax, error) => {
                console.warn(error);
                console.log("Encountered a MathJax error, re-attempting a typeset!");
                MathJax.Hub.Queue(
                  MathJax.Hub.Typeset()
                );
            } }
            script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
            options={ {
                asciimath2jax: {
                     useMathMLspacing: true,
                     delimiters: [["$$","$$"]],
                     preview: "none",
                }
            } }
        >
            <MathJax.Text content={ content }/>
        </MathJax.Context>
    );
}
```
# Inline display of AsciiMath without delimiters

```jsx
import MathJax from 'react-mathjax'

const ascii = 'U = 1/(R_(si) + sum_(i=1)^n(s_n/lambda_n) + R_(se))'

module.exports = () => {
    return (
        <div>
            <MathJax.Context input='ascii'>
                <div>
                    This is an inline formula written in AsciiMath: <MathJax.Node inline>{ ascii }</MathJax.Node>
                </div>
            </MathJax.Context>
        </div>
    );
}
```

# Block display of AsciiMath

```jsx
import MathJax from 'react-mathjax'

const ascii = 'U = 1/(R_(si) + sum_(i=1)^n(s_n/lambda_n) + R_(se))'

module.exports = () => {
    return (
        <div>
            <MathJax.Context input='ascii'>
                <div>
                    <MathJax.Node>{ascii}</MathJax.Node>
                </div>
            </MathJax.Context>
        </div>
    );
}
```

# Inline display of LaTeX

```jsx
import MathJax from 'react-mathjax'

const tex = `f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi`

module.exports = () => {
    return (
        <div>
            <MathJax.Context input='tex'>
                <div>
                    This is an inline math formula: <MathJax.Node inline>{'a = b'}</MathJax.Node>
                </div>
            </MathJax.Context>
        </div>
    );
}
```

# Block display of LaTeX

```jsx
import MathJax from 'react-mathjax'

const tex = `f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi`

module.exports = () => {
    return (
        <div>
            <MathJax.Context input='ascii'>
                <div>
                    <MathJax.Node>{tex}</MathJax.Node>
                </div>
            </MathJax.Context>
        </div>
    );
}
```

## API

### `MathJax.Context` props

#### `script` (String)
- Loads specified link with MathJax library.
- Default: `https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML`

#### `input` (String)
- Sets type of input.
- Options: `tex` | `ascii`
- Default: `ascii`

#### `delay` (Number)
- Sets delay between updates.
- Default: 0 (the main difference between this library and [react-mathjax](https://github.com/SamyPesse/react-mathjax) from SamyPesse)

#### `options` (Object)
- Sets [MathJax configuration](http://docs.mathjax.org/en/latest/options/index.html?highlight=hub.config#configuration-objects). 
- Default: Official MathJax configuration

## Acknowledgements
- This project was forked from [MatejMazur](https://github.com/MatejMazur) ([react-mathjax](https://github.com/MatejMazur/react-mathjax)).

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
