const _this = this;

const compose = func =>
  function (arg) {
    return this === _this
      ? func(arg)
      : this(func(arg))
    ;
  }
;

export default compose;
