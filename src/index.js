const _this = this;

export const tack = func =>
  function (...args) {
    return this === _this
      ? func(...args) // bound to the global obj
      : func(this, ...args) // bound to something intersting
    ;
  }
;

export const compose = func =>
  function (arg) {
    return this === _this
      ? func(arg)
      : this(func(arg))
    ;
  }
;
