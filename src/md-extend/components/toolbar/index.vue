<template>
  <div :class="classes">
    <div :class="classesLeft">
      <!-- <md-icon type="menu" size="22" color="white" class="md-toolbar__left-item md-toolbar__left-menu cursor-pointer" v-if="!hideMenuBtn" @click="onClickMenuBtn"></md-icon>
       <div class="md-toolbar__left-item md-toolbar__left-brand cursor-pointer" v-if="!collapsed">
           <img src="../../../src/assets/logo.png" alt="icon" v-if="icon">
           <span class="title" v-if="title">{{ title }}</span>
       </div>-->
      <slot name="left">
        <md-icon type="md-menu" size="22" color="white"
                 :class="classesIcon" v-if="!hideMenuBtn"
                 @click.native="onClickMenuBtn"></md-icon>
        <div :class="classesBrand" v-if="!selfCollapsed">
          <img src="../../../../assets/logo.png" alt="icon" v-if="icon">
          <span :class="`${prefixCls}__left-brand-title`" v-if="title">{{ title }}</span>
        </div>
      </slot>
    </div>
    <div :class="`${prefixCls}__content`">
      <slot></slot>
    </div>
    <div :class="`${prefixCls}__right`">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
    const prefixCls = 'md-toolbar';

    export default {
        name: 'md-toolbar',
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: '',
            },
            hideMenuBtn: {
                type: Boolean,
                default: false,
            },
            collapsed: {
                type: Boolean,
                default: false,
            },
            theme: {
                type: String,
                default: 'dark',
                validator: value => {
                    return ['dark', 'light'].indexOf(value) !== -1;
                }
            }
        },
        computed: {
            classesLeft() {
                // {[`${prefixCls}__left`]: true}
                return [
                    `${prefixCls}__left`,
                    'expand-width',
                ];
            },
            classesIcon() {
                return [
                    `${prefixCls}__left-item`,
                    `${prefixCls}__left-menu`,
                    'cursor-pointer',
                ];
            },
            classesBrand() {
                return [
                    `${prefixCls}__left-item`,
                    `${prefixCls}__left-brand`,
                    'cursor-pointer',
                ];
            },
            classes() {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}--dark`]: this.theme === 'dark',
                        [`${prefixCls}--light`]: this.theme === 'light'
                    }
                ];
            }
        },
        watch: {
            collapsed: {
                immediate: true,
                handler(to) {
                    this.selfCollapsed = to;
                    if (to) {
                        this.classNames = [
                            'collapsed-width',
                            'display-flex',
                            'justify-main-center',
                            'align-item-center',
                        ];
                    } else {
                        this.classNames = ['expand-width'];
                    }
                }
            }
            /* collapsed(to) {
               this.selfCollapsed = to;
               console.log("=======", to);
               if (to) {
                 this.classNames = [
                   'collapsed-width',
                   'display-flex',
                   'justify-main-center',
                   'align-item-center'
                 ]
               } else {
                 this.classNames = ['expand-width']
               }
             }*/
        },
        data() {
            return {
                prefixCls,
                // classNames: ['expand-width'],
                selfCollapsed: false,
            };
        },
        methods: {
            onClickMenuBtn() {
                this.selfCollapsed = !this.selfCollapsed;
                this.$emit('on-click-collapsed', this.selfCollapsed);
            }
        }
    };
</script>

