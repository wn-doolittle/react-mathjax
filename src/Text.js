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
    
    // I have no idea why we need to do this, but first time we ever run MathJax, we need to Reprocess
    if (!initialized) {
      MathJax.Hub.Queue(
        MathJax.Hub.Reprocess(this.div)
      );
      initialized = true;
    }

    MathJax.Hub.Queue(
      () => {
        try {
          MathJax.Hub.PreProcess(this.div);
        } catch (error) {
          // ignore
        }
      },
      () => {
        try {
          MathJax.Hub.Typeset(this.div);
        } catch (error) {
          //ignore
        }
      }
    );
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