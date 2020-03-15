<template>
    <div class="sidebar-menu-shrink">
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;position: relative;" :key="index">
                <Dropdown transfer placement="right-start" :key="index" @on-click="changeMenu" :class="{'menu-shrink--active':isActive(item)}">
                    <Button style="width: 80px;padding:10px 0;" type="text" class="shrink-btn-item"  @click="changeMenu(item)">
                        <md-icon :size="20" :color="iconColor" :type="item.icon"></md-icon>
                    </Button>
                    <DropdownMenu style="width: 250px;" slot="list" v-if="item.childList.length>0">
                        <template v-for="(child, i) in item.childList">
                            <DropdownItem :name="genMenuItemName(child)" :key="i" v-if="!child.childList || child.childList.length<=0">
                              <md-icon :type="child.icon" :color="iconColor" :size="iconSize"></md-icon>
                              <span style="padding-left:10px;" class="menus-item__title">{{ itemTitle(child) }}</span>
                            </DropdownItem>
                            <Dropdown transfer placement="right-start"
                                      :key="i"
                                      @on-click="changeMenu"
                                      :class="{'menu-shrink--active':isActive(child)}"
                                      v-if="child.childList && child.childList.length>0">
                                <DropdownItem :name="genMenuItemName(child)" :key="child.name">
                                    <md-icon :type="child.icon" :color="iconColor" :size="iconSize"></md-icon>
                                    <span style="padding-left:10px;" class="menus-item__title">{{ itemTitle(child) }}</span>
                                </DropdownItem>
                                <DropdownMenu style="width: 250px;" slot="list" v-if="child.childList.length>0">
                                    <template v-for="(child2, i) in child.childList">

                                        <DropdownItem :name="genMenuItemName(child2)" :key="i">
                                            <md-icon :type="child2.icon" :color="iconColor" :size="iconSize"></md-icon>
                                            <span style="padding-left:10px;" class="menus-item__title">{{ itemTitle(child2) }}</span>
                                        </DropdownItem>
                                    </template>
                                </DropdownMenu>
                            </Dropdown>
                        </template>
                    </DropdownMenu>
                </Dropdown>
               <!-- <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                    <Button @click="changeMenu(item.childList[index].name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                         <md-icon :size="20" :color="iconColor" :type="item.icon || item.icon"></md-icon>
                    </Button>
                    <DropdownMenu style="width: 250px;" slot="list">
                        <DropdownItem :name="item.childList[0].name" :key="'d' + index">
                            <md-icon :size="20" :color="iconColor" :type="item.childList[0].icon || item.icon"></md-icon>
                            <span style="padding-left:10px;">{{ itemTitle(item.childList[0]) }}</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>-->
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
      }
    },
  watch:{
    '$route':{
      immediate:true,
      handler(to) {
        this.activeName = to.path;
      }
    }
  },
  data() {
      return {
        activeName:'',
      }
  },
    methods: {
      isActive(item) {
        return this.activeName.indexOf(this.genMenuItemName(item)) !== -1
        //return this.genMenuItemName(item) === this.activeName;
      },
      genMenuItemName(item) {
        if (!item.route) {
          return `/${item.level}`
        };
        return item.route
      },
      changeMenu(active) {
        // console.log(active,  this.genMenuItemName(active))
        if (Object.prototype.toString.call(active) === "[object String]") {
          this.activeName = active
          this.$emit('on-change', active);
        } else {
          this.activeName = this.genMenuItemName(active);
          active.route && this.$emit('on-change', active.route);
        }
      },
        itemTitle (item) {
          return item.name;
            // if (typeof item.title === 'object') {
            //   return item.title.i18n
            //     // return this.$t(item.title.i18n);
            // } else {
            //     return item.title;
            // }
        }
    }
};
</script>

