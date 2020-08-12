<template>
  <div :class="classes">
    <div :class="`${prefixCls}__wrap`">
      <div :class="`${prefixCls}__header`">

        <i :class="classesIcon">
          <slot name="icon">
          </slot>
        </i>
      </div>
      <div :class="`${prefixCls}__body`">
        <div :class="`${prefixCls}--title`">
          <slot name="title"><span v-html="title"></span></slot>
        </div>
        <div :class="`${prefixCls}--text`">
          <slot name="text"><span v-html="text"></span></slot>
        </div>
        <div :class="`${prefixCls}--desc`">
          <slot name="desc"><span v-html="desc"></span></slot>
        </div>
      </div>
      <div :class="`${prefixCls}__footer`">
        <div :class="`${prefixCls}__actions`" >
          <slot name="footer">
            <Button v-for="(item, index) in actions"  :key="index" @click="handleClickBtnItem(item, index)" :type="buttonType(index)" :class="classesBtn" >{{item}}</Button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    const prefixCls = 'md-result';

    const RESULT_TYPE = {
        success: 'success',
        fail: 'fail',
        processing: 'processing',
    };

    export default {
        name: 'md-result',
        props:{
            type:{
                type: String,
                default: '',
                /*validator(value) {
                  return ['success', 'fail', 'processing'].indexOf(value) >= 0;
                }*/
            },
            title:String,
            text:String,
            desc:String,
            actions:{
                type: Array,
                default: function () {
                    return ['取消', '确定'];
                },
                // default: Array.from(['取消', '确定'])
            },
        },
        computed:{
            classes() {
                return [
                    `${prefixCls}`,
                ];
            },
            classesIcon() {
                return [
                    `${prefixCls}__icon`,
                    'ivu-icon',
                    {
                        ['ivu-icon-ios-checkmark']:this.type === RESULT_TYPE.success,
                        ['ivu-icon-ios-close']:this.type === RESULT_TYPE.fail,
                        ['ivu-icon-ios-alert']:this.type === RESULT_TYPE.processing,
                        [`${prefixCls}__icon--success`]: this.type === RESULT_TYPE.success,
                        [`${prefixCls}__icon--fail`]: this.type === RESULT_TYPE.fail,
                        [`${prefixCls}__icon--processing`]: this.type === RESULT_TYPE.processing,
                    }
                ];
            },
            classesBtn() {
                return [
                    `${prefixCls}__btn`,
                    'flex-fill',
                ];
            },
        },
        data() {
            return {
                prefixCls
            };
        },
        methods:{

            buttonType(index) {
                return  index > 0 ? 'default' : 'primary';
            },
            handleClickBtnItem(item, index) {
                this.$emit('on-click-item', item, index);
            },
            /* classesBtn(index) {
               let arrClass = [];
               if (index <= 0 && this.footerItems.length > 1) {
                 arrClass.push('font-666')
               } else if (index > 0 || this.footerItems.length === 1) {
                 arrClass.push('font-blue')
               }
               return arrClass;
             },*/
        }
    };
</script>
