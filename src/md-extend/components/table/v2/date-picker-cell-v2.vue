<template>
  <DatePicker class="table-cell-date-picker" type="datetime" :dateFormat="dateFormat" placeholder="" :value="value" :transfer="transfer"  v-bind="$attrs" v-on="$listeners"></DatePicker>
</template>

<script>
    import dayjs from '../../../libs/dayjs';

export default {
    name: 'date-picker-cell',
    props:{
        date:String,
        transfer:Boolean,
        dateFormat:{
            type:String,
            default:'yyyy-MM-dd HH:mm:ss'
        }
    },
    watch:{
        date:{
            immediate:true,
            handler(to) {
                this.value = dayjs(to).format(this.dateFormat);
            }
        },
        value:{
            immediate:true,
            handler(to) {
                to&&this.$emit('on-change', to);
            }
        }
    },
    data() {
        return {
            value: ''
        };
    }
};
</script>

<style lang="less">
.table-cell-date-picker {
    border: 1px solid #d9d9d9;
    .ivu-date-picker-editor {
        height: 46px;
        line-height: 46px;
    }
}
</style>
