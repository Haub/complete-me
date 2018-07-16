import { expect } from 'chai';
import Node from '../lib/Node.js';

describe('Node', () => {
  let node;

  beforeEach( () => {
    node = new Node();
  }); 

  it('should exist', () => {
    expect(node).to.exist;
  });

  it('should have a default property of completed word set to false', () => {
    expect(node.completedWord).to.equal(null);
  });

  it('should have a default property of children set to an empty object', () => {
    expect(node.children).to.deep.equal({});
  });
	

});
