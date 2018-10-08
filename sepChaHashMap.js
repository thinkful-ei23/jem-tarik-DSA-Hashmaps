'use strict';

class _Node {
  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].find(key);
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);

    if (this._slots[index]) {
      console.log('If condition for set method is running! At index ', index);
      console.log('LinkedList head - ', JSON.stringify(this._slots[index].head, null, 2));
      this._slots[index].insertFirst(key, value);
    }

    else {
      console.log('Else condition for set is running! At index ', index);
      let LinkedList = {
        head: null,
        insertFirst: (k, v) => {
          LinkedList.head  = new _Node(k, v, LinkedList.head);
        },
        find: (k) => {
          let currNode = LinkedList.head;
          if (!LinkedList.head) {
            return null;
          }

          while (currNode.key !== k) {
            if (currNode.next === null) {
              return null;
            } else {
              currNode = currNode.next;
            }
          }
          return currNode.value;
        },
        delete: (k) => {
          let prevNode = LinkedList.head;
          let currNode = LinkedList.head;
          if (!LinkedList.head) {
            return null;
          }

          while (currNode !== null && currNode.key !== k) {
            prevNode = currNode;
            currNode = currNode.next;
          }
          if (currNode === null) {
            throw new Error('Key not found!');
          }
          prevNode.next = currNode.next;
        }
      };

      this._slots[index] = LinkedList;
      this._slots[index].insertFirst(key, value);

    }
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    this._slots[index].delete(key);
    this.length--;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key == key)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

let newMap = new HashMap();
newMap.set('Hobbit', 'Bilbo');
newMap.set('Hobbit', 'Frodo');
newMap.set('Wizard', 'Gandolf');
newMap.set('Human', 'Aragon');
newMap.set('Elf', 'Legolas');
newMap.set('Maiar', 'The Necromancer');
newMap.set('Maiar', 'Sauron');
newMap.set('RingBearer', 'Gollum');
newMap.set('LadyOfLight', 'Galadriel');
newMap.set('HalfElven', 'Arwen');
newMap.set('Ent', 'Treebeard');
console.log(JSON.stringify(newMap._slots, null, 2));

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

module.exports = HashMap;