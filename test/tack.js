import { expect } from 'chai';
import { tack } from '../';
import mapValues from 'lodash/mapValues';

describe('tack', function () {
  const succ = tack(num => num + 1);
  const pred = tack(num => num - 1);

  it('should work after binding to interesting thing', function () {
    expect(1::succ()).to.equal(2);
  });

  it('should work after binding to uninteresting thing', function () {
    expect(succ(2)).to.equal(3);
  });

  it('should work via with chaining', function () {
    expect(2::succ()::succ()::pred()).to.equal(3);
  });

  const add = tack((a, b) => a + b);

  it('should work with multiple argument functions', function () {
    expect(4::add(2)).to.equal(6);
  });

  const map = tack(mapValues);
  const o = { a: 1, b: 2 };

  it('should work with lodash map', function () {
    expect(o::map(succ)).to.deep.equal(mapValues(o, succ));
  });

  it('should compose when bound to functions', function () {
    expect(succ::succ::succ(0)).to.equal(3);
  });


  const makeTriple = (a, b, c) => [a, b, c];

  it('should insert `this` into non-defualt position', function () {
    expect('middle'::(tack(makeTriple, 1))('start', 'end'))
    .to.deep.equal(['start', 'middle', 'end']);

    expect('end'::(tack(makeTriple, 2))('start', 'middle'))
    .to.deep.equal(['start', 'middle', 'end']);
  });
});
