'use strict'

function sort(input) {

  for (let i=input.length; i>0; i-=1) {
    for (let j=0; j<i; j+=1) {
        if (input[j] > input[i]) {
            [input[j], input[i]] = [input[i], input[j]]
        }
    }
  } 

  return input;
  
}

module.exports = sort
