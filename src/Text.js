import React from 'react';
import PropTypes from 'prop-types' ;

let initialized = false;

class Text extends React.Component {
  componentDidMount() {
    this.refreshMathJax();
  }

  componentDidUpdate() {
    this.refreshMathJax();
  }

  refreshMathJax() {
    const { MathJax } = this.context;
    if (!MathJax) {
      throw Error("MathJax not found in context for controls");
    }
    
    const temp = initialized;
    MathJax.Hub.Queue(
      () => {
        if (!temp) {
          // I have no idea why we need to do this, but first time we ever run MathJax, we need to Reprocess
          MathJax.Hub.Reprocess(this.div)
        }

        // Always do a PreProcess and Typeset afterwards
        try {
          MathJax.Hub.PreProcess(this.div);
          MathJax.Hub.Typeset(this.div);
        } catch (error) {
          //ignore
        }
      }
    );
    initialized = true;
  }

  render() {
    const { classes, options } = this.props;

    return (
      <div ref={ (div) => this.div = div }>
        { this.props.text }
      </div>
    );
  }
}

Text.contextTypes = {
  MathJax: PropTypes.object,
};

export default Text;