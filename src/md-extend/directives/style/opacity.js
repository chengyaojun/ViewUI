function bind(el, binding, vnode) {
    const callback = parseFloat(binding.value);
    const options = binding.options || {passive: true};
    const target = binding.arg;

    el.style.opacity = callback;
    el._opacity = {
        callback,
        options,
        target
    };
}


function unbind(el) {
    if (!el._opacity) return;
    delete el._opacity;
}

export default {
    bind,
    unbind
};
