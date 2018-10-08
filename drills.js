'use strict';

const hashMapClass = require ('./buildHashMap');

function main() {
  let lor = new hashMapClass();

  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragon');
  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');
  console.log(lor.get('Maiar'));

  console.log(lor);

  console.log(permIsPalindrome('acecarr'));
  console.log(permIsPalindrome('north'));  
  console.log(permIsPalindrome('mmada'));
  console.log(permIsPalindrome('banana'));
}

// input: acecarr
// output: true

// is the string odd or even?

function permIsPalindrome(str) {
  str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  let permMap = new Map();
  for (let i = 0; i < str.length; i++) {
    if(permMap.has(str[i])) {
      permMap.delete(str[i]);
    }
    else if (!permMap.has(str[i])) {
      permMap.set(str[i], i);
    }
  }

  if (str.length % 2 === 0 && permMap.size === 0) {
    return true;
  }

  if (str.length % 2 === 1 && permMap.size === 1) {
    return true;
  }

  return false;
}
// function has an O(n) runtime

main();

