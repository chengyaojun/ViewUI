<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div class="sidebar-menu-con" :style="{width: shrink?'80px':'250px'}"
         :class="{'sidebar-menu-con-footer__has':!hideFooter,'sidebar-menu-con-footer__none':hideFooter}">
      <scroll-bar ref="scrollBar">
        <shrinkable-menu
            :shrink="shrink"
            @on-change="handleSubmenuChange"
            :theme="theme"
            :class="themeClassName"
            class="shrinkable-menu"
            :before-push="beforePush"
            :open-names="getOpenedSubs()"
            :icon-size="iconSize"
            :icon-color="iconColor"
            :show-divider="showDivider"
            :cell-height="cellHeight"
            :id-route-map="idRouteMap"
            :menu-list="menuList">
          <!--<div slot="top" class="logo-con">-->
          <!--<img v-show="!shrink"  src="@/assets/logo.png" key="max-logo" />-->
          <!--<img v-show="shrink" src="@/assets/logo.png" key="min-logo" />-->
          <!--</div>-->
        </shrinkable-menu>
      </scroll-bar>
      <Affix v-if="!hideFooter" :offset-bottom="0" class="menu-right-footer" @click.native="toggleClick"
             :style="{width: shrink?'80px':'250px'}">
        <div style="padding: 0 16px;">
          <template v-if="!shrink">
            <md-icon type="md-arrow-back" size="18"></md-icon>
          </template>
          <template v-else>
            <md-icon type="md-arrow-forward" size="18"></md-icon>
          </template>
        </div>
      </Affix>
    </div>
  </div>
</template>
<script>
    import shrinkableMenu from './index';
    import scrollBar from '../scroll-bar';
    // import _menuList from './data/menu'

    export default {
        components: {
            shrinkableMenu,
            scrollBar
        },
        model: {
            prop: 'collapsed',
        },
        props: {
            cellHeight: {
                type: Number,
                default: 48,
            },
            iconSize: {
                type: Number,
                default: 16,
            },
            iconColor: {
                type: Object | String,
                default: '#C5C8CD'
            },
            collapsed: {
                type: Boolean,
                default: false,
            },
            menus: {
                type: Array | Object,
                default: [],
            },
            hideFooter: {
                type: Boolean,
                default: true
            },
            showDivider: {
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
        data() {
            return {
                menuList: [],
                shrink: false,
                openedSubmenuArr: [],
                menusMap:{},
                idRouteMap: {},
            };
        },
        computed: {
            themeClassName() {
                if (this.theme === 'dark') {
                    return ['shrinkable-menu--dark'];
                } else {
                    return ['shrinkable-menu--light'];
                }
            },
            menuTheme() {
                return 'light';
                // return this.$store.state.app.menuTheme;
            },
        },
        methods: {
            getOpenedSubs() {
                const route = this.$route.path;
                const _id = this.menusMap[route];
                if (!_id) return [];
                const split = '.';
                const last = _id.lastIndexOf(split);
                let start = 0;
                let end = 0;
                let subs = [];
                while (true) {
                    if (start>=last) break;
                    end = _id.indexOf(split, start);
                    const v = _id.substring(0, end)
                    start = end + 1;
                    subs.push(v);
                }

                subs.push(_id);
                return subs;
            },
            normalizedMenusList(menus) {
                let subs = menus;
                const genId = (parent, current) => {
                    const arr = [parent, current].filter(elem=>{
                      return elem !== undefined && elem !== null;
                    });
                    return arr.join('.');
                }
                let findSubs = (data, parentId) =>{
                    data.forEach((e, index) => {
                        e._id = genId(parentId, index);

                        if (!e.childList || e.childList.length <= 0) {
                            e.icon = e.icon || 'logo-buffer';
                            if (e.route) {
                              this.menusMap[e.route] = e._id
                              this.idRouteMap[e._id] = e;
                            };
                        } else {
                            findSubs(e.childList, e._id);
                        }
                    });
                }
                findSubs(subs)
                return subs;
            },
            getMenusList() {
                this.menuList = this.normalizedMenusList(this.menus);//_menuList['result'];
            },
            toggleClick() {
                this.shrink = !this.shrink;
                this.$emit('input', this.shrink);
            },
            handleSubmenuChange(val) {
                // console.log(val)
            },
            beforePush(name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            scrollBarResize() {
                this.$refs.scrollBar.resize();
            }
        },
        watch: {
            collapsed(to) {
                this.shrink = to;
            },
            '$route'(to) {
                // this.$store.commit('setCurrentPageName', to.name);
                // let pathArr = util.setCurrentPath(this, to.name);
                // if (pathArr.length > 2) {
                //     this.$store.commit('addOpenSubmenu', pathArr[1].name);
                // }
                // this.checkTag(to.name);
                // localStorage.currentPageName = to.name;
            },
            openedSubs() {
                setTimeout(() => {
                    this.scrollBarResize();
                }, 300);
            }
        },
        mounted() {
            window.addEventListener('resize', this.scrollBarResize);
        },
        created() {
            // 显示打开的页面的列表
            // this.$store.commit('setOpenedList');
            this.getMenusList();
        },
        dispatch() {
            window.removeEventListener('resize', this.scrollBarResize);
        }
    };
</script>

