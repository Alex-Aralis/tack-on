const _this = this;

const tack = (func, argIndex = 0) =>
  function (...args) {
    if (this === _this)
      return func(...args);

    if (typeof this === 'function')
      return this(func(...args));

    return func(
      ...[
        ...args.slice(0, argIndex),
        this,
        ...args.slice(argIndex),
      ],
    );
  }
;

export default tack;
