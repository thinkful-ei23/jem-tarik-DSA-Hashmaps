'use strict';

const hashMapClass = require ('./buildHashMap');

function main() {
  // let lor = new hashMapClass();

  // lor.set('Hobbit', 'Bilbo');
  // lor.set('Hobbit', 'Frodo');
  // lor.set('Wizard', 'Gandolf');
  // lor.set('Human', 'Aragon');
  // lor.set('Elf', 'Legolas');
  // lor.set('Maiar', 'The Necromancer');
  // lor.set('Maiar', 'Sauron');
  // lor.set('RingBearer', 'Gollum');
  // lor.set('LadyOfLight', 'Galadriel');
  // lor.set('HalfElven', 'Arwen');
  // lor.set('Ent', 'Treebeard');
  // console.log(lor.get('Maiar'));

  // console.log(lor);

  // console.log(permIsPalindrome('acecarr'));
  // console.log(permIsPalindrome('north'));  
  // console.log(permIsPalindrome('mmada'));
  // console.log(permIsPalindrome('banana'));
  console.log(anagramGroup(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
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
      permMap.set(str[i]);
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


//input: an array of words: 
// ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
//output: an array of arrays of grouped words: 
//[['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]

//iterate over each word, add up ASCII value to turn into a #
//ASCII values will be the keys, value is an array of each item with the same ASCII (will replace with new item, ... array).
//return map.values of hashmap--should return array, with items that are the value of each key (values are arrays, so should output an array of arrays)

function anagramGroup(arr) {
  let ngramMap = new Map ();
  let retArr = [];
  arr.forEach(word => {
    let numVal = 0;
    for (let i = 0; i < word.length; i++) {
      numVal += word.charCodeAt(i);
    }
    if (!ngramMap.get(numVal)) {
      ngramMap.set(numVal, [word]);
      retArr.push(numVal);
    } else {
      ngramMap.set(numVal, [...ngramMap.get(numVal), word]);
    }
  });
  retArr = retArr.map(key => ngramMap.get(key));
  return retArr;
}
  

main();

