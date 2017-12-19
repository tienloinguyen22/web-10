'use strict'

function search(input, target) {

  let result = -1;
  for (let i=0; i<input.length; i+=1) {
    if (input[i] == target) {
      result = i;
      break;
    }
  }
  return result;
  
}

module.exports = search
