<template>
  <md-menu
      class="menus"
      ref="sideMenu"
      :active-name="activeName"
      :open-names="openNames"
      :theme="menuTheme"
      width="auto"
      @on-select="changeMenu"
  >
    <template v-for="item in menuList">
      <md-menu-item
          :name="genMenuItemName(item)"
          :key="'menuitem' + item.name"
          class="menus-item"
          style="padding: 0 14px 0 14px"
          :style="{'height':cellHeight+'px', 'line-height':cellHeight+'px'}"
          v-if="item.childList.length<=0"
      >
        <md-col>
          <md-icon class="menus-item__icon"
                   :type="item.icon"
                   :size="iconSize"
                   :color="iconColor"
                   :key="'menuicon' + item.name">
          </md-icon>
          <span :key="'title' + item.name" class="menus-item__title">{{ itemTitle(item) }}</span>
        </md-col>
      </md-menu-item>
      <md-divider style="margin: 0" v-if="item.childList.length<=0" v-show="showDivider"/>
      <md-submenu class="menus-item" v-if="item.childList && item.childList.length>0" :name="genMenuItemName(item)"
                  :key="item.name">
        <template slot="title">
          <Col>
            <md-icon class="menus-item__icon" :type="item.icon" :size="iconSize" :color="iconColor"></md-icon>
            <span class="menus-item__title">{{ itemTitle(item) }}</span>
          </Col>
        </template>
        <template v-for="(child, index) in item.childList">
          <md-menu-item
              :name="genMenuItemName(child)"
              :key="'menuitem' + child.name"
              class="menus-item__submenus"
              style="padding: 0 14px 0 14px"
              :style="{'height':cellHeight+'px', 'line-height':cellHeight+'px'}"
              v-if="!child.childList || child.childList.length<=0"
          >
            <md-col offset="2">
              <md-icon class="menus-item__icon" :type="child.icon" :size="iconSize" :color="iconColor"></md-icon>
              <span :key="'title' + child.name" class="menus-item__title">{{ itemTitle(child) }}</span>
            </md-col>
          </md-menu-item>
          <Submenu class="menus-item" v-if="child.childList && child.childList.length>0" :name="genMenuItemName(child)"
                   :key="child.name">
            <template slot="title">
              <Col offset="2">
                <md-icon class="menus-item__icon" :type="child.icon" :size="iconSize" :color="iconColor"></md-icon>
                <span class="menus-item__title">{{ itemTitle(child) }}</span>
              </Col>
            </template>
            <template v-for="child2 in child.childList">
              <md-menu-item
                  :name="genMenuItemName(child2)"
                  :key="'menuitem' + child2.name"
                  class="menus-item__submenus"
                  style="padding: 0 14px 0 14px"
                  :style="{'height':cellHeight+'px', 'line-height':cellHeight+'px'}"
              >
                <md-col offset="4">
                  <md-icon class="menus-item__icon" :type="child2.icon" :size="iconSize" :color="iconColor"></md-icon>
                  <span :key="'title' + child2.route" class="menus-item__title">{{ itemTitle(child2) }}</span>
                </md-col>
              </md-menu-item>
            </template>
          </Submenu>
        </template>
      </md-submenu>
      <md-divider style="margin: 0" v-if="item.childList && item.childList.length>0" v-show="showDivider"/>
    </template>
  </md-menu>
</template>

<script>
    import {consoleError} from '../../../../md-extend/libs/console';

    export default {
        name: 'sidebarMenu',
        filters: {
            emptyString(val) {
                if (!val) return '';
                return val;
            }
        },
        props: {
            menuList: Array,
            menuTheme: {
                type: String,
                default: 'light'
            },
            openNames: {
                type: Array
            },
            showDivider: {
                type: Boolean,
                default: true
            },
            iconColor: {
                type: Object | String,
                default: '#C5C8CD'
            },
            iconSize: {
                type: Number,
                default: 16,
            },
            cellHeight: {
                type: Number,
                default: 56,
            },
            idRouteMap: {
                type: Object,
            },
        },
        watch: {
            idRouteMap: {
                immediate: true,
                handler(val) {
                }
            }
        },
        data() {
            return {
                // activeName:'',
                // idMapRoute: {},
            };
        },
        computed: {
            activeName() {
                if (this.openNames.length <= 0) return 0;
                return this.openNames[this.openNames.length - 1];
            }
        },
        methods: {
            genMenuItemName(item) {
                return item._id;
            },
            changeMenu(active) {
                const currentItem = this.idRouteMap[active];
                if (!currentItem) return;
                active && this.$emit('on-change', currentItem.route);
            },
            itemTitle(item) {
                if (!item) return '';
                return item.name;
            }
        },
        updated() {
            this.$nextTick(() => {
                if (this.$refs.sideMenu) {
                    this.$refs.sideMenu.updateOpened();
                }
            });
        }
    };
</script>
