function bind(el, binding, vnode) {
    const callback = parseFloat(binding.value);
    const options = binding.options || {passive: true};
    const target = binding.arg;

    el.style.height = `${callback}px`;
    el._height = {
        callback,
        options,
        target
    };
}


function unbind(el) {
    if (!el._height) return;
    delete el._height;
}

export default {
    bind,
    unbind
};
