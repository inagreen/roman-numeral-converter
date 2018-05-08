import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | convert-number', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:convert-number');
    assert.ok(route);
  });
});
