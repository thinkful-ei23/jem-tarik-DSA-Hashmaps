'use strict';

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}
  
class LinkedList {
  constructor() {
    this.head = null;
  }
  
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  
  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
  
  insertBefore(newItem, currentItem) {
    if (!this.head) {
      return null;
    }
    let currNode = this.head;
    let previousNode = this.head;
  
    while (currNode !== null && currNode.value !== currentItem) {
      previousNode = currNode;
      currNode = currNode.next;
    }
  
    previousNode.next = new _Node(newItem, currNode);
  }
  
  insertAfter(newItem, currentItem) {
    if (!this.head) {
      return null;
    }
    let current = this.head;
    let previous = this.head;
  
    while (current !== null && previous.value !== currentItem) {
      previous = current;
      current = current.next;
    }
  
    previous.next = new _Node(newItem, current);
  }
  
  insertAt(newItem, n) {
    if (!this.head) {
      this.insertFirst(newItem);
    }
  
    let count = 0;
    let previous = this.head;
    let current = this.head;
  
    while (count !== n) {
      count++;
      previous = current;
      current = current.next;
    }
  
    previous.next = new _Node(newItem, current); 
  }
  
  find(item) {
    let currNode = this.head;
  
    if (!this.head) {
      return null;
    }
  
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }
  
  remove(item) {
    if (!this.head) {
      return null;
    }
  
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
  
    let currNode = this.head;
    let previousNode = this.head;
  
    while (currNode !== null && currNode.value !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
  
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }
}
  
module.exports = { LinkedList, _Node };