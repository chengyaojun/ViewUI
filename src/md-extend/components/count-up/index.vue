<template>
  <span/>
</template>

<script>
    import {CountUp} from '../../libs/countUp';

    const typeOf = type => object => Object.prototype.toString.call(object) === `[object ${type}]`;
    // const isString = typeOf('String');
    // const isObject = typeOf('Object');
    const isFunction = typeOf('Function');
    export default {
        name: 'CountUp',
        props: {
            delay: {
                type: Number,
                required: false,
                default: 0,
            },
            endVal: {
                type: Number | String,
                required: true,
            },
            /*options: {
                type: Object,
                required: false,
            },*/
            startVal: {
                type: Number | String,
                required: false,
                default: 0,
            },
            decimalPlaces: {
                type: Number | String,
                required: false,
                default: 0,
            },
            duration: {
                type: Number | String,
                required: false,
                default: 2,
            },
            useEasing: {
                type: Boolean,
                required: false,
                default: true,
            },
            useGrouping: {
                type: Boolean,
                required: false,
                default: true,
            },
            smartEasingThreshold: {
                type: Number | String,
                required: false,
                default: 999,
            },
            smartEasingAmount: {
                type: Number | String,
                required: false,
                default: 333,
            },
            separator: {
                type: String,
                required: false,
                default: ',',
            },
            decimal: {
                type: String,
                required: false,
                default: '.',
            },
            prefix: {
                type: String,
                required: false,
                default: '',
            },
            suffix: {
                type: String,
                required: false,
                default: '',
            },
            easingFn: Function,
            formattingFn: Function,
            numerals: [],
        },
        data() {
            return {
                instance: null,
            };
        },
        watch: {
            endVal: {
                handler(value) {
                    const that = this;
                    if (that.instance && isFunction(that.instance.update)) {
                        that.instance.update(value);
                    }
                },
                deep: false
            },
        },
        methods: {
            create(callback=null) {
                const that = this;
                if (that.instance) {
                    return;
                }
                const dom = that.$el;
                let options = {
                    startVal: Number(this.startVal),
                    decimalPlaces: Number(this.decimalPlaces),
                    duration: Number(this.duration),
                    useEasing: this.useEasing,
                    useGrouping: this.useGrouping,
                    smartEasingThreshold: Number(this.smartEasingThreshold),
                    smartEasingAmount: Number(this.smartEasingAmount),
                    separator: this.separator,
                    decimal: this.decimal,
                    prefix: this.prefix,
                    suffix: this.suffix,
                    numerals: this.numerals,
                    easingFn: this.easingFn,
                    formattingFn: this.formattingFn,
                };
                const instance = new CountUp(
                    dom,
                    that.endVal,
                    options
                    // that.options
                );
                if (instance.error) {
                    // error
                    return;
                }
                that.instance = instance;
                if (that.delay < 0) {
                    that.$emit('ready', this, CountUp);
                    return;
                }
                setTimeout(() => instance.start(() => {
                    if (callback) {
                        callback();
                    } else {
                        that.$emit('ready', this, CountUp);
                    }
                }), that.delay);
            },
            destroy() {
                const that = this;
                that.instance = null;
            },
            printValue(value) {
                const that = this;
                if (that.instance && isFunction(that.instance.printValue)) {
                    return that.instance.printValue(value);
                }
            },
            start(callback) {
                const that = this;
                that.instance = null;
                that.create(callback);
                /*const that = this;
                if (that.instance && isFunction(that.instance.start)) {
                    return that.instance.start(callback);
                }*/
            },
            pauseResume() {
                const that = this;
                if (that.instance && isFunction(that.instance.pauseResume)) {
                    return that.instance.pauseResume();
                }
            },
            reset() {
                const that = this;
                if (that.instance && isFunction(that.instance.reset)) {
                    return that.instance.reset();
                }
            },
            update(newEndVal) {
                const that = this;
                if (that.instance && isFunction(that.instance.update)) {
                    return that.instance.update(newEndVal);
                }
            }
        },
        mounted() {
            const that = this;
            that.create();
        },
        beforeDestroy() {
            const that = this;
            that.destroy();
        },
    };
</script>
