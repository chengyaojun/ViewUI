<template>
  <div class="drop-down-cell display-flex justify-content-space-around">
    <Dropdown trigger="click" @on-click="onClickItem" :transfer="transfer">
      <div class="display-flex justify-content-center">
          {{ getCurrentLabel(this.cloneValue) }}
        <md-icon type="md-arrow-dropdown" v-show="editable"></md-icon>
      </div>
      <DropdownMenu slot="list" v-show="editable">
          <DropdownItem v-for="item in option" :key="item.value" :name="item.value">{{ item.label }}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: "drop-down-cell",
  model: {
    prop: "cell"
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    option: Array | Object,
    transfer:Boolean,
    value: [Object, String, Number],
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
    value: {
      immediate: true,
      handler(to) {
        this.cloneValue = to;
      }
    },
  },
  created() {
    // console.log(this.mapItems, this.cell.row[this.cell.column.key]);
  },
  data() {
    return {
      cloneValue: null
    };
  },
  methods: {
    getCurrentLabel(val) {
      if (val === '' || val === null) return '';
      let label = '';
      this.option.map(item => {
        if (item.value === val) {
          label = item.label;
        }
      });
      return label
    },

    onClickItem(val) {
      this.$nextTick(() => {
        this.cloneValue = val;
        this.$emit("on-change", this.cloneValue);
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
