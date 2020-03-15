<template>
  <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="" v-model="value" :transfer="transfer"
              v-bind="$attrs" v-on="$listeners"></DatePicker>
</template>

<script>
    import dayjs from '../../libs/dayjs';

    export default {
        name: 'date-picker-cell',
        props: {
            date: String,
            transfer: Boolean
        },
        watch: {
            date: {
                immediate: true,
                handler(to) {
                    this.value = dayjs(to).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            value: {
                immediate: true,
                handler(to) {
                    // console.log("vaue:",to);
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

<style scoped>

</style>
