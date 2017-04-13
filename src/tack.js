const _this = this;

const tack = (
  func,
  argIndex = 0,
  action =
    t => t === _this
      ? 'nothing'
      : typeof t === 'function'
        ? 'compose'
        : 'tack',
) =>
  function (...args) {
    const a = action(this);

    switch (a) {
      case 'tack':
        return func(
          ...[
            ...args.slice(0, argIndex),
            this,
            ...args.slice(argIndex),
          ],
        );

      case 'compose':
        return this(func(...args));

      case 'nothing':
        return func(...args);

      default:
        throw Error(`Unexpected return value from action funciton: ${a}`);
    }
  }
;

export default tack;
