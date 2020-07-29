<template>
  <div :class="classes" ref="grid">

    <div :class="`${prefixCls}-item`" v-for="(item, index) in values" :style="styles">
      <div :class="`${prefixCls}-item-main`">
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
    const prefixCls = 'md-grid';

    export default {
        name: 'grid',
        props: {
            value: {
                type: [Number, Array],
                default: 1
            },
            border: {
                type: Boolean,
                default: false
            },
            hover: {
                type: Boolean,
                default: false
            },
            verticalCenter: {
                type: Boolean,
                default: false
            },
            column: {
                type: [Number, String],
                default: '1'
            },
            square: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            classes() {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-border`]: this.border,
                        [`${prefixCls}-hover`]: this.hover,
                        [`${prefixCls}-center`]: this.verticalCenter
                    }
                ];
            },
            styles() {
                let style = {};
                let h = !this.itemHeight ? 'auto' : `${this.itemHeight}px`;
                style = {
                    width: `${100 / this.column}%`,
                    height: h
                };
                return style;
            },
        },
        watch: {
            // value(value){
            'value': {
                immediate: true,
                handler(value) {
                    if (Object.prototype.toString.call(value) === '[object Array]') {
                        this.values = value;
                    } else if (Object.prototype.toString.call(value) === '[object Number]') {
                        this.values = new Array(value);
                    }
                }
            },
        },
        data() {
            return {
                prefixCls,
                values: [],
                itemHeight: '',
            };
        },
        mounted() {
            this.$nextTick(() => {
                if (this.square) {
                    let rate = (100 / this.column) / 100;
                    this.itemHeight = this.$refs.grid.clientWidth * rate;
                }
            });
        },
    };
</script>

