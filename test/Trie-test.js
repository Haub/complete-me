import { expect } from 'chai';
import Trie from '../lib/Trie';
import Node from '../lib/Node';

describe('Trie', () => { 
  let trie;

  beforeEach( () => { 
    trie = new Trie();
  });


  it('should exist', () => {
    expect(trie).to.exist;
  });

  it('should set its initial counter to 0', () => {
    expect(trie.counter).to.equal(0);
  });

  it('should have a root node that is an instance of Node', () => {
    expect(trie.root).to.be.an.instanceof(Node);
  });

  it('should have a property of dictionary set to an empty object', () => {
    expect(trie.suggestions).to.deep.equal([]);
  });


  describe('INSERT', (word) => {
    it('should exist and be a method on the Trie Class', () => {
      expect(trie).respondTo('insert');
    });


    it('should increment word count of the Trie with each word inserted', () => {
      trie.insert('turing');
      expect(trie.counter).to.equal(1);
    });

    it('should not increment word count of the Trie if a duplicate is inserted', () => {
      trie.insert('happy');
      trie.insert('happy');
      expect(trie.counter).to.equal(1);
		});

		it('should have multiple children when one or more words share the same parent or parents', () => {
			trie.insert('doggy');
			trie.insert('dogma');
			expect(Object.keys(trie.root.children.d.children.o.children.g.children).length).to.equal(2);
		})

	});

	  describe('COUNT', () => {
	    it('should return the current counter of Trie', () => {
	      trie.insert('dog');
	      trie.insert('cat');
	      expect(trie.counter).to.equal(2);
			});

  });

  describe('SUGGEST', (prefix) => {
  	
  	it('should exist', () => {
  		expect(trie).respondTo('suggest');
  		// console.log(JSON.stringify(trie, null, 4));
  	})

  	it('should add an array of words to suggestions',() => {
  		trie.insert('help');
  		trie.insert('hand');
  		trie.insert('happy');
  		trie.suggest('h');
  		expect(trie.suggestions).to.deep.equal(['help', 'hand', 'happy'])
  	})

  
  })

});