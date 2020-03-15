<style lang="less">
    @import "index.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'80px':'250px'}">
            <scroll-bar ref="scrollBar">
                <shrinkable-menu
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :theme="menuTheme"
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                    <!--<div slot="top" class="logo-con">-->
                        <!--<img v-show="!shrink"  src="@/assets/logo.png" key="max-logo" />-->
                        <!--<img v-show="shrink" src="@/assets/logo.png" key="min-logo" />-->
                    <!--</div>-->
                </shrinkable-menu>

            </scroll-bar>

          <Affix :offset-bottom="0" class="menu-right-footer" @click.native="toggleClick"  :style="{width: shrink?'80px':'250px'}">
            <div style="padding: 0 16px;">
              <template v-if="!shrink">
                <md-icon type="first_page" ></md-icon>
              </template>
              <template v-else>
                <md-icon type="last_page"></md-icon>
              </template>
            </div>
          </Affix>

        </div>

        <!--<div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">-->
            <!--<div class="main-header">-->
                <!--<div class="navicon-con">-->
                    <!--<Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">-->
                        <!--<Icon type="navicon" size="32"></Icon>-->
                    <!--</Button>-->
                <!--</div>-->
                <!--<div class="header-middle-con">-->
                    <!--<div class="main-breadcrumb">-->
                        <!--<breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="header-avator-con">-->
                    <!--<full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>-->
                    <!--<lock-screen></lock-screen>-->
                    <!--<message-tip v-model="mesCount"></message-tip>-->
                    <!--<theme-switch></theme-switch>-->

                    <!--<div class="user-dropdown-menu-con">-->
                        <!--<Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">-->
                            <!--<Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">-->
                                <!--<a href="javascript:void(0)">-->
                                    <!--<span class="main-user-name">{{ userName }}</span>-->
                                    <!--<Icon type="arrow-down-b"></Icon>-->
                                <!--</a>-->
                                <!--<DropdownMenu slot="list">-->
                                    <!--<DropdownItem name="ownSpace">个人中心</DropdownItem>-->
                                    <!--<DropdownItem name="loginout" divided>退出登录</DropdownItem>-->
                                <!--</DropdownMenu>-->
                            <!--</Dropdown>-->
                            <!--<Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>-->
                        <!--</Row>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="tags-con">-->
                <!--<tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="single-page-con" :style="{left: shrink?'60px':'200px'}">-->
            <!--<div class="single-page">-->
                <!--<keep-alive :include="cachePage">-->
                    <!--<router-view></router-view>-->
                <!--</keep-alive>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
    // import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    // import tagsPageOpened from './main-components/tags-page-opened.vue';
    // import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    // import fullScreen from './main-components/fullscreen.vue';
    // import lockScreen from './main-components/lockscreen/lockscreen.vue';
    // import messageTip from './main-components/message-tip.vue';
    // import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    // import Cookies from 'js-cookie';
    // import util from '@/libs/util.js';
    // import scrollBar from '@/views/my-components/scroll-bar/vue-scroller-bars';

    import shrinkableMenu from '../index';
    import scrollBar from '../../md-scroll-bar';
    import util from '../../libs/util';
    import _menuList from './data/menu'
    import _pageTagsList from './data/pageTagsList'
    import _currentPath from './data/currentPath'
    import _cachePage from './data/cachePage'

    export default {
        components: {
            shrinkableMenu,
            // tagsPageOpened,
            // breadcrumbNav,
            // fullScreen,
            // lockScreen,
            // messageTip,
            // themeSwitch,
            scrollBar
        },
        model:{
          prop:'collapsed'
        },
        props:{
          collapsed:{
            type:Boolean,
            default:false,
          }
        },
        data () {
            return {
              menuList:[],
                shrink: false,
                userName: '',
                isFullScreen: false,
                // openedSubmenuArr: ["component","tables","form","advanced-router"]
                openedSubmenuArr: [],//["个人中心","tables","form","advanced-router"]
            };
        },
        computed: {
            // menuList () {
            //   console.log(this.$md.state.personal_menus);
            //   return this.$md.state.personal_menus;
            //     // return _menuList
            //     // return this.$store.state.app.menuList;
            // },
            pageTagsList () {
              return _pageTagsList
                // return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
              return _currentPath;
                // return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
              return _cachePage
                // return this.$store.state.app.cachePage;
            },
            lang () {
              return ""
                // return this.$store.state.app.lang;
            },
            menuTheme () {
              return 'light'
                // return this.$store.state.app.menuTheme;
            },
            mesCount () {
              return 3;
                // return this.$store.state.app.messageCount;
            }
        },
        methods: {
          getMenusList(){
            this.menuList = _menuList['result'];
            this.openedSubmenuArr = this.menuList.map(elem=>{
              return elem.name;
            })

            // this.menuList = [_menuList[2]];
            // this.$md.dispatch('personal_menus', {userId:'4'}).then(data=>{
            //   let list = data['result'][1];
            //
            //   let childList = list['childList'];
            //   this.menuList = [list];
            //   this.openedSubmenuArr = this.menuList .map(elem=>{
            //     return elem.name;
            //   })
            //   // this.openedSubmenuArr = this.menuList;
            //   console.log(this.menuList);
            //   // this.menuList = data['result']
            //   // console.log( data['result'][1]);
            // })
          },
            init () {
                // let pathArr = util.setCurrentPath(this, this.$route.name);
                // this.$store.commit('updateMenulist');
                // if (pathArr.length >= 2) {
                //     this.$store.commit('addOpenSubmenu', pathArr[1].name);
                // }
                // this.userName = Cookies.get('user');
                // let messageCount = 3;
                // this.messageCount = messageCount.toString();
                // this.checkTag(this.$route.name);
                // this.$store.commit('setMessageCount', 3);
            },
            toggleClick () {
                this.shrink = !this.shrink;
                this.$emit('input', this.shrink);
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$router.push({
                        name: 'login'
                    });
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            },
            scrollBarResize () {
                this.$refs.scrollBar.resize();
            }
        },
        watch: {
            collapsed(to) {
              this.shrink = to;
            },
            '$route' (to) {
                // this.$store.commit('setCurrentPageName', to.name);
                // let pathArr = util.setCurrentPath(this, to.name);
                // if (pathArr.length > 2) {
                //     this.$store.commit('addOpenSubmenu', pathArr[1].name);
                // }
                // this.checkTag(to.name);
                // localStorage.currentPageName = to.name;
            },
            lang () {
                // util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            },
            openedSubmenuArr () {
                setTimeout(() => {
                    this.scrollBarResize();
                }, 300);
            }
        },
        mounted () {
            this.init();
            window.addEventListener('resize', this.scrollBarResize);
        },
        created () {
            // 显示打开的页面的列表
            // this.$store.commit('setOpenedList');
          this.getMenusList();
        },
        dispatch () {
            window.removeEventListener('resize', this.scrollBarResize);
        }
    };
</script>
