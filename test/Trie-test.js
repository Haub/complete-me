import { expect } from 'chai';
import Trie from '../lib/Trie';
import Node from '../lib/Node';
import fs from 'fs';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

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
		});

	});

		describe('COUNT', () => {
			it('should return the current counter of Trie', () => {
				trie.insert('dog');
				trie.insert('cat');
				expect(trie.counter).to.equal(2);
		});

	});

	describe('SUGGEST', () => {
		
		it('should exist', () => {
			expect(trie).respondTo('suggest');    
		});

		it('should add an array of words to suggestions', () => {
			trie.insert('help');
			trie.insert('hand');
			trie.insert('happy');
			trie.insert('cat');
			trie.insert('dog');
			trie.suggest('h');
			expect(trie.suggest('h')).to.deep.equal(['help', 'hand', 'happy']);
		});
	});

	describe('POPULATE', () => {
		it('should exist', () => {
			expect(trie).respondTo('populate');    
		});

		it('should increase trie word count to 234372', () => {
			trie.populate(dictionary);
			trie.count();
			expect(trie.counter).to.equal(234372);
		});
	});

	describe('FIND', () => {
		it('should exist', () => {
			expect(trie).respondTo('find');
		});

		it('should be able to find a word in the dictionary', () => {
			trie.insert('dog');
			trie.find('dog');
			expect(trie.find('dog')).to.deep.equal(trie.root.children.d.children.o.children.g);
		});
	});

	describe('REMOVE', () => {
		it('should exist', () => {
			expect(trie).respondTo('remove');
		});

		it('should remove completed word flag from last node', () => {
			trie.insert('hello');
			trie.insert('help');
			trie.remove('help');
			expect(trie.counter).to.equal(1);
		});

	});

});