function bind(el, binding, vnode) {
  const callback = parseFloat(binding.value);
  const options = binding.options || { passive: true};
  const target = binding.arg

  el.style.lineHeight = `${callback}px`;
  el._lineHeight = {
    callback,
    options,
    target
  }
}


function unbind(el) {
  if (!el._lineHeight) return;
  delete el._lineHeight
}

export default {
  bind,
  unbind
}
