<template>
  <div class="drop-down-cell display-flex justify-content-space-around">
    <Dropdown trigger="click" @on-click="onClickItem">
      <div>
        <!--{{ items[cell.row[cell.column.key]] }}-->
        <!--    <template v-if="mapItems">
            {{ mapItems[cell.row[cell.column.key]] }}
          </template>
          <template v-else>
            {{ cell.row[cell.column.key] }}
        </template>-->
        {{ mapItems[cell.row[cell.column.key]] }}
        <md-icon type="baseline-arrow_drop_down" v-show="editable"></md-icon>
      </div>
      <DropdownMenu slot="list" v-show="editable">
        <template v-if="mapItems">
          <DropdownItem v-for="(item, key) in keys" :key="key" :name="item">{{ mapItems[item] }}</DropdownItem>
        </template>
        <!--<template v-else>-->
        <!--<DropdownItem v-for="(item, key) in cell.column.dropdownList" :key="key" :name="item">{{ item }}</DropdownItem>-->
        <!--</template>-->
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
    export default {
        name: 'drop-down-cell',
        model: {
            prop: 'cell'
        },
        props: {
            mapItems: Object,
            cell: Object,
            editable: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            keys() {
                return Object.keys(this.mapItems);
            }
        },
        watch: {
            editable(to) {
                console.log(to);
            },
            mapItems(to) {
            }
        },
        created() {
            // console.log(this.mapItems, this.cell.row[this.cell.column.key]);
        },
        data() {
            return {};
        },
        methods: {
            onClickItem(val) {
                this.$nextTick(() => {
                    this.cell['row'][this.cell['column']['key']] = val;
                    this.$emit('on-change', this.cell);
                });
            }
        }
    };
</script>
<style>
  .ivu-select-dropdown {
    border-radius: 0;
    max-height: 200px !important;
    overflow: auto !important;
  }
</style>

<style lang="less" scoped>
  .drop-down-cell {
    cursor: pointer;
  }
</style>
