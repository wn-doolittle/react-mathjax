import React from 'react';
import PropTypes from 'prop-types' ;

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

    MathJax.Hub.Queue(
      () => {
        if (this.props.beforeTypeset) {
          this.props.beforeTypeset();
        }
        
        try {
          MathJax.Hub.PreProcess();
          MathJax.Hub.Typeset();
        } catch (error) {
          console.log("mathjax error!");
          console.warn(error);
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