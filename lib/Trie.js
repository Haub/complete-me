import Node from './Node.js';

export default class Trie {
  constructor() {
    this.root = new Node();
    this.counter = 0;
  }

  insert(word) {
    let currNode = this.root;
    let lettersArray = [...word];

    while (lettersArray.length) {
      let currentLetter = lettersArray.shift().toLowerCase();

      if (!currNode.children[currentLetter]) {
        currNode.children[currentLetter] = new Node(currentLetter);
      } 
    
      currNode = currNode.children[currentLetter]; 
    
    }

    if (!currNode.completedWord) {
    	currNode.completedWord = word;
    	this.count();
    }
  }

  count() {
  	this.counter++;
  }

  suggest(prefix) {
    let currNode = this.root;
    let prefixArray = [...prefix.toLowerCase()];
    let suggestions = [];

    prefixArray.forEach(letter => {
      currNode = currNode.children[letter];
    });

    const search = currNode => {
	    if (currNode.completedWord) {
	    	 suggestions.push(currNode.completedWord);
	    }

	    let childrenKeys = Object.keys(currNode.children);

	    childrenKeys.forEach(nodeKey => {
	     	search(currNode.children[nodeKey]);
	    });
	  };

 		search(currNode);
    return suggestions;
  }

  populate(dictionary) {
  	dictionary.forEach(word => {
  		this.insert(word);
  	});
  }

  find(word) {
  	let currNode = this.root;
  	let letterArray = [...word];

  	while (letterArray.length) {
  		let currLetter = letterArray.shift().toLowerCase();

	  	if (currNode.children[currLetter]) {
	  		currNode = currNode.children[currLetter];
	  	} else {
	  		return null;
	  	}
	  }
	  return currNode;
  }

  remove(word) {
    let currNode = this.root;
    let prefixArray = [...word.toLowerCase()];
    let prevNode = this.root;
    let key;


    prefixArray.forEach(letter => {

    	prevNode = currNode;
      currNode = currNode.children[letter];
      key = letter;
    });

    if (currNode.completedWord) {
    	currNode.completedWord = null;
    	this.counter --;
    }

    if (!Object.keys(currNode.children).length) {
    	delete prevNode.children[key];
    }
  }

}


	




