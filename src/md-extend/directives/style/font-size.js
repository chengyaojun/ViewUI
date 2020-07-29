function bind(el, binding, vnode) {
    const callback = binding.value;
    const options = binding.options || {passive: true};
    const target = binding.arg;

    el.style.fontSize = callback;
    el._fontSize = {
        callback,
        options,
        target
    };
}


function unbind(el) {
    if (!el._fontSize) return;
    delete el._fontSize;
}

export default {
    bind,
    unbind
};
