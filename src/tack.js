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
        throw new Error(
          `Unexpected return value from action function: "${a}". `
        + 'Expected "tack, "compose", or "nothing".'
        );
    }
  }
;

export default tack;
