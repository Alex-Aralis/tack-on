import { expect } from 'chai';
import { compose } from '../';

describe('tack', function () {
  const succ = compose(num => num + 1);
  const pred = compose(num => num - 1);

  it('should not compose when bound to an uninteresting thing', function () {
    expect(succ(2)).to.equal(3);
  });

  it('should compose when bound to an interesitng thing', function () {
    expect(succ::succ(2)).to.equal(4);
  });

  it('should work in long chain', function () {
    expect(succ::pred::succ::pred::succ::succ(1)).to.equal(3);
  });
});
