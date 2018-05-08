import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | roman-converter', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the input box with specified text', async function(assert) {
    await render(hbs`{{roman-converter}}`);
    assert.equal(this.element.querySelector('input').placeholder, 'Put any integer between 1-3999');
  });

  test('it renders the convert button', async function(assert) {
    await render(hbs`{{roman-converter}}`);
    assert.equal(this.element.textContent.trim(), 'Convert');
  });

  test('it renders a roman numeral when a number ranging from 1-3999 is specified in the input and the convert button is clicked', async function(assert) {
    await render(hbs`{{roman-converter}}`);
    await fillIn('input', 1234);
    await click('#convert');
    assert.equal(this.element.querySelector('h2').textContent.trim(), 'MCCXXXIV', 'result should show roman numeral after click');
  });

  test('it renders a validation message error specifying input is not a number when input type !== Number after button is clicked', async function(assert) {
    await render(hbs`{{roman-converter}}`);
    await fillIn('input', 'Kirsty');
    await click('#convert');
    assert.equal(this.element.querySelector('.alert-danger').textContent.trim(), 'Value is not an integer! Please enter an integer between from 1-3999.', 'result should show error message after incorrect input & click');
  });

  test('it should reset input field to an empty string when reset button is clicked', async function(assert) {
    await render(hbs`{{roman-converter}}`);
    await fillIn('input', 1234);
    await click('#convert');
    await click('#reset');
    assert.equal(this.element.querySelector('input').value, '', 'Input value should be empty when reset is clicked');
  });

  test('it should reset input field to an empty string when acknowledge button is clicked', async function(assert) {
    await render(hbs`{{roman-converter}}`);
    await fillIn('input', 'Hidderley');
    await click('#convert');
    await click('#okay');
    assert.equal(this.element.querySelector('input').value, '', 'Input value should be empty when acknolwedge button is clicked');
  });
});
