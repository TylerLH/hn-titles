import React from "react";

export default class Word extends React.Component {
  render() {
    const {count, text} = this.props;
    const style = {
      fontSize: 10 + (1 * count)
    };
    return (
      <span style={style}>{text}</span>
    );
  }
}
