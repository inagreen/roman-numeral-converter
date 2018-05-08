import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | roman-converter', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let component = this.owner.factoryFor('component:roman-converter').create();
    assert.ok(component);
  });

  test('it resets all properties to null', function(assert) {
    let romanConverter = this.owner.lookup('component:roman-converter');
    romanConverter.resetValidationError();
    if (romanConverter.get('value')) assert.notOk(romanConverter.get('value'));
    assert.notOk(romanConverter.get('convertedNumber'));
    assert.notOk(romanConverter.get('validationError'));
  });

  test('it returns a number when a number passed in parameter is between 1-3999', function(assert) {
    assert.expect(2);
    let romanConverter = this.owner.lookup('component:roman-converter');
    assert.equal(romanConverter.checkInput(3), 3);
    assert.equal(romanConverter.checkInput(6), 6);
  });

  test('it sets a specific validation message error when passed input is not a number and not within 1-3999 range', function(assert) {
    assert.expect(2);
    let romanConverter = this.owner.lookup('component:roman-converter');
    romanConverter.validation('Kirsty');
    assert.equal(romanConverter.get('validationError'), 'Value is not an integer! Please enter an integer between from 1-3999.');
    romanConverter.validation(-2000);
    assert.equal(romanConverter.get('validationError'), 'Value is out of range! Please enter an integer between 1-3999.');
  });

  test('it returns a reversed array of string of digits based on a number input', function(assert) {
    assert.expect(2);
    let romanConverter = this.owner.lookup('component:roman-converter'),
        expected = ['4','3','2','1'],
        result = romanConverter.splitDigits(1234);

    assert.deepEqual(result, expected);

    result = romanConverter.splitDigits(6789);
    expected = ['9', '8', '7', '6'];

    assert.deepEqual(result, expected);
  });

  test('it returns a roman value when a single digit and its roman identifiers are passed', function(assert) {
    assert.expect(2);
    let romanConverter = this.owner.lookup('component:roman-converter');
    assert.equal(romanConverter.decimalToRoman(3, 'I', 'V', 'X'), 'III');
    assert.equal(romanConverter.decimalToRoman(9, 'I', 'V', 'X'), 'IX');
  });

  test('it returns a string of roman numeral when input of array of string digits is passed', function(assert) {
    assert.expect(2);
    let romanConverter = this.owner.lookup('component:roman-converter'),
        expected = 'CXI',
        result = romanConverter.convertArrayToRoman(['1', '1', '1']);

    assert.equal(result, expected);

    expected = 'M';
    result = romanConverter.convertArrayToRoman(['0','0','0','1']);

    assert.equal(result, expected);
  });
});
