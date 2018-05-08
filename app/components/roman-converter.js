import Component from '@ember/component';

export default Component.extend({

  convertedNumber: null,

  validationError: null,

  // Method runs initial check on the input
  checkInput(value) {
    let onlyNumbers = /^\d+$/.test(value);
    if (onlyNumbers) {
      let number = parseInt(value);
      return (number > 0 && number < 4000) ? number : this.validation(number);
    } else {
      this.validation(value);
    }
  },

  // Method throws validation error for out of range values and type error
  validation (value) {
    if (!Number.isInteger(value)) this.set('validationError', 'Value is not an integer! Please enter an integer between from 1-3999.');
    if (value < 1 || value > 3999) this.set('validationError', 'Value is out of range! Please enter an integer between 1-3999.');
  },

  // Method splits digits into an array of string and reverse the order
  splitDigits(number) {
    let digitsArray = number.toString(10).split(''),
        reverseDigitsArray = digitsArray.reverse();
    return reverseDigitsArray;
  },

  // Method converts digits to roman numerals by specifying values for i, v and x
  decimalToRoman (number, i, v, x) {
    let romanNumeral = {
          1: i,
          2: i+i,
          3: i+i+i,
          4: i+v,
          5: v,
          6: v+i,
          7: v+i+i,
          8: v+i+i+i,
          9: i+x
        };
    return romanNumeral[number]
  },

  // Method converts array of string of digits to roman numeral based on digit's index and returns a string
  convertArrayToRoman (numberArray) {
    let newArray = [];
    numberArray.forEach((number, index) => {
        if (index == 0) {
          newArray.push(this.decimalToRoman(number, 'I', 'V', 'X'));
        } else if (index == 1) {
          newArray.push(this.decimalToRoman(number, 'X', 'L', 'C'));
        } else if (index == 2) {
          newArray.push(this.decimalToRoman(number, 'C', 'D', 'M'));
        } else if (index == 3 && number < 4){
          newArray.push(this.decimalToRoman (number, 'M'));
        }
    }, err => {
      this.reset();
      return err;
    });
    return newArray ? newArray.reverse().join('') : this.reset();
  },

  // method resets input value, input number and validation error
  reset () {
    if (this.get('convertedNumber')) this.set('convertedNumber', null);
    if (this.get('value')) this.set('value', null);
    if (this.get('validationError')) this.set('validationError', null);
  },

  // Method to reset all values if there is validation error
  resetValidationError () {
    if (this.get('validationError')) this.reset();
  },

  actions: {
    convertNumber (value) {
      this.resetValidationError();
      let number = this.checkInput(value);
      if (number) {
        let numberArray = this.splitDigits(number),
            convertedString = this.convertArrayToRoman(numberArray);
            // joinArray = this.joinArray(convertedArray);
        if (convertedString) this.set('convertedNumber', convertedString);
      }
    },

    reset () {
      this.reset();
    }
  }
});
