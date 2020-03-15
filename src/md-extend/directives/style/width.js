function bind(el, binding, vnode) {
  const callback = parseFloat(binding.value);
  const options = binding.options || { passive: true};
  const target = binding.arg

  el.style.width = `${callback}px`;

  el._width = {
    callback,
    options,
    target
  }
}


function unbind(el) {
  if (!el._width) return;
  delete el._width
}

export default {
  bind,
  unbind
}
