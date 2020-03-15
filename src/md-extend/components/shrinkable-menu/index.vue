<template>
  <div class="ivu-shrinkable-menu">
    <slot name="top"></slot>
    <sidebar-menu
        v-show="!shrink"
        :menu-theme="theme"
        :menu-list="menuList"
        :open-names="openNames"
        :icon-size="iconSize"
        :icon-color="iconColor"
        :show-divider="showDivider"
        :cell-height="cellHeight"
        @on-change="handleChange"
    ></sidebar-menu>
    <sidebar-menu-shrink
        v-show="shrink"
        :menu-theme="theme"
        :menu-list="menuList"
        :icon-size="iconSize"
        :icon-color="iconColor"
        @on-change="handleChange"
    ></sidebar-menu-shrink>
  </div>
</template>

<script>
    import sidebarMenu from './components/sidebarMenu.vue';
    import sidebarMenuShrink from './components/sidebarMenuShrink.vue';
    import util from './util';
    // import util from '@/libs/util';
    export default {
        name: 'shrinkableMenu',
        components: {
            sidebarMenu,
            sidebarMenuShrink
        },
        props: {
            shrink: {
                type: Boolean,
                default: false
            },
            iconSize: {
                type: Number,
                default: 16,
            },
            iconColor: {
                type: Object | String,
                default: '#C5C8CD'
            },
            cellHeight: {
                type: Number,
                default: 56,
            },
            menuList: {
                type: Array,
                required: true
            },
            theme: {
                type: String,
                default: 'dark',
                validator(val) {
                    return util.oneOf(val, ['dark', 'light']);
                }
            },
            beforePush: {
                type: Function
            },
            openNames: {
                type: Array
            },
            showDivider: {
                type: Boolean,
                default: true,
            }
        },
        computed: {
            bgColor() {
                return this.theme === 'dark' ? '#495060' : '#fafafa';
            },
            shrinkIconColor() {
                return this.theme === 'dark' ? '#595959' : '#495060';
                // return this.theme === 'dark' ? '#fafafa' : '#495060';
            }
        },
        methods: {
            handleChange(name) {

                let willpush = true;
                if (this.beforePush !== undefined) {
                    if (!this.beforePush(name)) {
                        willpush = false;
                    }
                }
                // console.log(willpush, name)
                if (willpush) {
                    this.$router.push({
                        path: name
                    });
                    // this.$router.push({
                    //     name: name
                    // });
                }

                this.$emit('on-change', name);
            }
        }
    };
</script>

<style lang="less" scoped>
  /*@import "./styles/menu.less";*/
</style>
