<template>
  <div class="sidebar-menu-shrink">
    <template v-for="(item, index) in menuList">
      <div style="text-align: center;position: relative;" :key="index">
        <md-dropdown transfer
                     placement="right-start"
                     :class="{'menu-shrink--active':isActive(item)}"
                     :key="index"
                     @on-click="changeMenu">
          <template v-if="item.childList.length>0">
            <md-btn type="text" class="shrink-btn-item" @click="changeMenu(item._id)" :name="genMenuItemName(item)">
              <md-icon :size="20" :color="iconColor" :type="item.icon"></md-icon>
            </md-btn>
          </template>
          <template v-else>
            <md-tooltip transfer placement="right-start" :content="item.name">
              <md-btn type="text" class="shrink-btn-item" @click="changeMenu(item._id)" :name="genMenuItemName(item)">
                <md-icon :size="20" :color="iconColor" :type="item.icon"></md-icon>
              </md-btn>
            </md-tooltip>
          </template>
          <md-dropdown-menu style="width: 250px;" slot="list" v-if="item.childList.length>0">
            <template v-for="(child, i) in item.childList">
              <md-dropdown-item :class="{'menu-shrink--active':isActive(child)}" :name="genMenuItemName(child)" :key="i"
                                v-if="!child.childList || child.childList.length<=0">
                <md-icon :type="child.icon" :color="iconColor" :size="iconSize"></md-icon>
                <span style="padding-left:10px;" class="menus-item__title">{{ itemTitle(child) }}</span>
              </md-dropdown-item>
              <md-dropdown transfer placement="right-start"
                           :key="i"
                           @on-click="changeMenu"
                           :class="{'menu-shrink--active':isActive(child)}"
                           style="width:inherit"
                           v-if="child.childList && child.childList.length>0">
                <md-dropdown-item :class="{'menu-shrink--active':isActive(child)}" :name="genMenuItemName(child)"
                                  :key="child.name">
                  <md-icon :type="child.icon" :color="iconColor" :size="iconSize"></md-icon>
                  <span style="padding-left:10px;" class="menus-item__title">{{ itemTitle(child) }}</span>
                </md-dropdown-item>
                <md-dropdown-menu style="width: 250px;" slot="list" v-if="child.childList.length>0">
                  <template v-for="(child2, i) in child.childList">
                    <md-dropdown-item :class="{'menu-shrink--active':isActive(child2)}" :name="genMenuItemName(child2)"
                                      :key="i">
                      <md-icon :type="child2.icon" :color="iconColor" :size="iconSize"></md-icon>
                      <span style="padding-left:10px;" class="menus-item__title">{{ itemTitle(child2) }}</span>
                    </md-dropdown-item>
                  </template>
                </md-dropdown-menu>
              </md-dropdown>
            </template>
          </md-dropdown-menu>
        </md-dropdown>
      </div>
    </template>
  </div>
</template>

<script>
    export default {
        name: 'sidebarMenuShrink',
        props: {
            menuList: {
                type: Array
            },
            iconColor: {
                type: String,
                default: 'white'
            },
            iconSize: {
                type: Number,
                default: 16,
            },
            menuTheme: {
                type: String,
                default: 'dark'
            },
            openNames: {
                type: Array
            },
            idRouteMap: {
                type: Object,
            },
        },
        data() {
            return {
                // idMapRoute: {},
            };
        },
        methods: {
            closeAll() {
                for (const key in this.visibleMap) {
                    if (this.visibleMap.hasOwnProperty(key)) {
                        this.visibleMap[key] = false;
                    }
                }
            },
            isActive(item) {
                const current = this.openNames.filter(elem => elem === item._id);
                return current.length > 0;
            },
            genMenuItemName(item) {
                return item._id;
            },
            changeMenu(active) {
                this.closeAll();
                const currentItem = this.idRouteMap[active];
                if (!currentItem) return;
                if (currentItem.childList && currentItem.childList.length > 0) return;
                active && this.$emit('on-change', currentItem.route);
            },
            itemTitle(item) {
                return item.name;
            }
        }
    };
</script>

