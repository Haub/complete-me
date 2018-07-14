export default class Node {
  constructor(letter) {
    this.letter = letter;
    this.completedWord = null;
    this.children = {};
  }
}