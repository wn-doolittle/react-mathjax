# React MathJax

React component to display math formulas written in AsciiMath or TeX.

This is a fork of [react-mathjax](https://github.com/MatejMazur/react-mathjax) from MatejMazur which is itself a fork of [react-mathjax](https://github.com/SamyPesse/react-mathjax) from SamyPresse.

This includes:
* an onLoad props to Context which triggers when the MathJax script finishes loading
* cleanup of the MathJax.Hub.Queue call to re-render a particular script tag

![Example of usage](/example.gif)

Based on the [react-mathjax](https://github.com/SamyPesse/react-mathjax) from SamyPesse. The main difference is in updated deps, syntax and extended options (delay of rendering and support for AsciiMath).

## Install
```
npm install https://github.com/wko27/react-mathjax --save
```

## Usage
```jsx
import MathJax from 'react-mathjax'
const ascii = 'U = 1/(R_(si) + sum_(i=1)^n(s_n/lambda_n) + R_(se))'
const tex = `f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi`

module.exports = () => {
    return (
        <div>
            <MathJax.Context input='ascii'>
                <div>
                    This is an inline math formula: <MathJax.Node inline>{'a = b'}</MathJax.Node>
                    And a block one:

                    <MathJax.Node>{ascii}</MathJax.Node>
                </div>
            </MathJax.Context>

            <MathJax.Context input='tex'>
                <div>
                    This is an inline math formula: <MathJax.Node inline>{'a = b'}</MathJax.Node>
                    And a block one:

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
