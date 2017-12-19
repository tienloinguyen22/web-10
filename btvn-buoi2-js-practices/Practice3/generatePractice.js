'use strict'

function generate(numberOfTestcases, filePath = "./test-data.json"){

  const test_type = ["Zero length", "Not found", "First index", "Last index", "Middle index"];
  const max_value = 10000;
  const min_value = -10000;
  const max_length = 500;
  const min_length = 0;


  function random_number(max, min) {
    return Math.floor(Math.random()*(max - min + 1) + min);
  }


  function create_input(type) {
    let input = [];

    //Zero length
    if (type === "Zero length" ) {
        return input;
    }

    //Other cases
    let input_length = random_number(max_length, min_length);
    
    for (let i=0; i<input_length; i+=1) {
      let value = random_number(max_value, min_value);
      
      if (input.indexOf(value) === -1) { 
        input.push(value);
          }
          
      }
      
    //Sort input list
    input.sort(function(a, b) {
      return a - b;
    });
    
    return input;

  }


  function create_target(type, input) {

    if (type === "Zero length" || type === "Not found") {
        return 10001;
    }
    else if (type === "First index") {
      return input[0];
    }
    else if (type === "Last index") {
      return input[input.length-1];
    }
    else if (type === "Middle index") {
      return input[Math.floor(input.length/2)];
    }
  }


  function create_output(type, input) {
    if (type === "Zero length" || type === "Not found") {
      return -1;
    }
    else if (type === "First index") {
      return 0;
    }
    else if (type === "Last index") {
      return input.length - 1;
    }
    else if (type === "Middle index") {
      return Math.floor(input.length/2);
    }
  }

  //Generate testcase
  let test_cases = [];

  for (let i=0; i<numberOfTestcases; i+=1) {
    let test_case = {}
    let type = test_type[i%5];
    test_case.input = create_input(type);
    test_case.target = create_target(type, test_case.input);
    test_case.output = create_output(type, test_case.input);
    test_cases.push(test_case);
  }

  return test_cases;

}

module.exports = generate