<template>
  <DatePicker  class="table-cell-date-picker" type="datetime" :format="dateFormat" placeholder="" v-model="value" :transfer="transfer"
              v-bind="$attrs" v-on="$listeners"></DatePicker>
</template>

<script>
  import { TYPE_VALUE_RESOLVER_MAP } from '../../../../components/date-picker/util';
  export default {
    name: 'date-picker-cell',
    props: {
      date: String,
      transfer: Boolean,
      dateFormat: {
        type: String,
        default: 'yyyy-MM-dd HH:mm:ss'
      }
    },
    watch: {
      date: {
        immediate: true,
        handler(to) {
          let {
            formatter,
            parser,
          } = TYPE_VALUE_RESOLVER_MAP.date;

          this.value = formatter(parser(to, this.dateFormat), this.dateFormat)
        }
      },
      value: {
        immediate: true,
        handler(to) {
          to && this.$emit('on-change', to);
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
