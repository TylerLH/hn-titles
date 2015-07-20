import React from "react";
import Word from "./Word";

export default class WordCloud extends React.Component {
  static propTypes = {
    words: React.PropTypes.object.isRequired
  }

  renderWords() {
    const {words} = this.props;
    const elements = [];
    words.forEach((v, k) => {
      elements.push(<Word key={k} count={v} text={k} />);
    });
    return elements;
  }

  render() {
    return (
      <div className="word-cloud">
        {this.renderWords()}
      </div>
    );
  }
}
