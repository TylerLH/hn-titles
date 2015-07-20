import "whatwg-fetch";
import _ from "underscore";
import React from "react";
import WordCloud from "./WordCloud";
import COMMON_WORDS from "./common_words.json";

const PROXY_URL = "http://localhost:1337";
const FEED_URL = `${PROXY_URL}/feeds.feedburner.com/ycombinator/APLd?format=xml`;

function getTitles(rss) {
  const doc = document.createElement("div");
  doc.innerHTML = rss;
  let titles = Array.prototype.slice.call(doc.getElementsByTagName("title"));
  return titles.slice().map(title => title.innerText.replace(/.,:/g, "").toLowerCase().split(" "));
}

function getWordFrequencies(titles) {
  const counts = new Map();
  let words = _.chain(titles).flatten().value();
  words = _.difference(words, COMMON_WORDS);
  words.forEach(word => {
    counts.set(word, (counts.get(word) || 0) + 1);
  });
  return counts;
}

fetch(FEED_URL)
  .then(res => res.text())
  .then(body => {
    const titles = getTitles(body);
    const words = getWordFrequencies(titles);
    React.render(<WordCloud words={words} />, document.getElementById("app"));
  });
