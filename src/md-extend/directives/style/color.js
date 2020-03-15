function bind(el, binding, vnode) {
  const callback = binding.value;
  const options = binding.options || { passive: true};
  const target = binding.arg

  el.style.color = callback;
  el._color = {
    callback,
    options,
    target
  }
}


function unbind(el) {
  if (!el._color) return;
  delete el._color
}

export default {
  bind,
  unbind
}
