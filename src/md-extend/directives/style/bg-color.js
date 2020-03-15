function bind(el, binding, vnode) {
  const callback = binding.value;
  const options = binding.options || { passive: true};
  const target = binding.arg

  el.style.backgroundColor = callback;
  el._bgColor = {
    callback,
    options,
    target
  }
}


function unbind(el) {
  if (!el._bgColor) return;
  delete el._bgColor
}

export default {
  bind,
  unbind
}
