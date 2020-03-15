<template>
  <Select v-model="cloneValue" :multiple="multiple" :disabled="readonly" v-bind="$attrs" v-on="$listeners"
          :transfer="transfer" filterable>
    <Option v-for="item in option" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>

<script>
    export default {
        name: 'select-cell',
        props: {
            option: Array | Object,
            multiple: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            transfer: Boolean,
            value: Array | Object
        },
        watch: {
            value: {
                immediate: true,
                handler(to) {
                    this.cloneValue = to;
                }
            },
            cloneValue: {
                immediate: true,
                handler(to) {
                    this.$emit('on-change', to);
                }
            }
        },
        data() {
            return {
                cloneValue: null
            };
        }
    };
</script>

<style scoped>
</style>
