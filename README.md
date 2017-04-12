# tack-on
[![Build Status](https://travis-ci.org/Alex-Aralis/yank-down.svg?branch=master)](https://travis-ci.org/Alex-Aralis/yank-down) [![codecov](https://codecov.io/gh/Alex-Aralis/tack-on/branch/master/graph/badge.svg)](https://codecov.io/gh/Alex-Aralis/tack-on) [![npm version](https://badge.fury.io/js/tack-on.svg)](https://badge.fury.io/js/tack-on) [![dependencies](https://david-dm.org/alex-aralis/tack-on.svg)](https://www.npmjs.com/package/tack-on)


Some neato functions inspired by the new [bind operator](https://babeljs.io/docs/plugins/transform-function-bind/) and functional programming.

## `tack`
Attach a function to a thing, without hanging it directly.  Great to add functionality that should have been there from the start, without the risk of mutating global objects.

### What?

```javascript
import mapValues from 'lodash';
import { tack } from 'tack-on';

const map = tack(mapValues);
let succ = n => n + 1;

expect({ a: 1, b: 2 }::map(succ)).to.deep.equal({ a: 2, b: 3 });
```

Tacked functions assume composing behavior when bound to functions.

```javascript
const succ = tack(n => n + 1);
const pred = tack(n => n - 1);

expect(succ::pred::succ::succ(0)).to.equal(2);
```

The position `this` is inserted into can be specified.

```javascript
const toTriple = tack((a, b, c) => [a, b, c], 1);

expect('middle'::toTriple('start', 'end'));
```

## `compose`
Make functions composable with the bind operator.  `compose` assumes functions that take only one argument.

### What?

```javascript
import { compose } from 'tack-on';

succ = compose(succ);
const pred = compose(n => n - 1);

expect(succ::pred::succ::succ::succ::pred(1)).to.equal(3)

const addThreeMorphism = succ::succ::succ;

expect(addThreeMorphism(3)).to.equal(6);
```
