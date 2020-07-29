function bind(el, binding, vnode) {
    const callback = binding.value;//parseFloat();
    const options = binding.options || {passive: true};
    const target = binding.arg;
    const type = Object.prototype.toString.call(binding.value);
    let paddingValue = binding.value;
    if (!target) {
        if (type === '[object Array]') {
            paddingValue = callback.map(e => {
                let numberValue = parseFloat(e);
                return `${numberValue}px`;
            }).join(' ');
            el.style.padding = paddingValue;
            console.log(el.style);
        } else {
            paddingValue = parseFloat(binding.value);
            el.style.padding = `${paddingValue}px`;
        }
    } else {
        paddingValue = parseFloat(binding.value);
        if (target === 'top') {
            el.style.paddingTop = `${paddingValue}px`;
        } else if (target === 'bottom') {
            el.style.paddingBottom = `${paddingValue}px`;
        } else if (target === 'left') {
            el.style.paddingLeft = `${paddingValue}px`;
        } else if (target === 'right') {
            el.style.paddingRight = `${paddingValue}px`;
        }
    }

    el._padding = {
        callback,
        options,
        target
    };
}


function unbind(el) {
    if (!el._padding) return;
    delete el._padding;
}

export default {
    bind,
    unbind
};
