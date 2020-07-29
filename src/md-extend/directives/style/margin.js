function bind(el, binding, vnode) {
    const callback = binding.value;//parseFloat();
    const options = binding.options || {passive: true};
    const target = binding.arg;
    const type = Object.prototype.toString.call(binding.value);
    let marginValue = binding.value;
    if (!target) {
        if (type === '[object Array]') {
            marginValue = callback.map(e => {
                let numberValue = parseFloat(e);
                return `${numberValue}px`;
            }).join(' ');
            el.style.margin = marginValue;
            console.log(el.style);
        } else {
            marginValue = parseFloat(binding.value);
            el.style.margin = `${marginValue}px`;
        }
    } else {
        marginValue = parseFloat(binding.value);
        if (target === 'top') {
            el.style.marginTop = `${marginValue}px`;
        } else if (target === 'bottom') {
            el.style.marginBottom = `${marginValue}px`;
        } else if (target === 'left') {
            el.style.marginLeft = `${marginValue}px`;
        } else if (target === 'right') {
            el.style.marginRight = `${marginValue}px`;
        }
    }

    el._margin = {
        callback,
        options,
        target
    };
}


function unbind(el) {
    if (!el._margin) return;
    delete el._margin;
}

export default {
    bind,
    unbind
};
