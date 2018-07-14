import Node from './Node.js';

export default class Trie {
  constructor() {
    this.root = new Node();
    this.counter = 0;
    this.suggestions = [];

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

    if(!currNode.completedWord) {
    	currNode.completedWord = word;
    	this.count();
		}

	}

  count() {
  	this.counter++
	}

	suggest(prefix) {
		let currNode = this.root;
		let prefixArray = [...prefix.toLowerCase()];
		let suggestions = [];

		prefixArray.forEach(letter => {
			currNode = currNode.children[letter]
		})

		search(currNode);
		
		return suggestions;
	}

	search(node) {
		if(node.completedWord) {
			suggestions.push(node.completedWord)
		}

		let nodeKeys = Object.keys(node.children)

		nodeKeys.forEach(nodeKey => {
			search(node.children[nodeKey])
		})
	}




	




}