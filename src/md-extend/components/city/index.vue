<template>
  <div :class="classes"
       v-click-outside:[capture]="onClickOutside"
       v-click-outside:[capture].mousedown="onClickOutside"
       v-click-outside:[capture].touchstart="onClickOutside">
    <div :class="`${prefixCls}__header`">
      <!--       <span :class="`${prefixCls}__header-label`">信息地址:</span>-->
      <div :class="classesHeaderClick" @click.stop="show = !show">
        <div :class="`${prefixCls}__header-click-input`" class="display-flex align-items-center" >
          <div class="display-flex align-items-center"  v-for="(item, index) in values">
            <span :class="`${prefixCls}__header-click-input-name`">{{ item.name }}</span>
            <span :class="`${prefixCls}__header-click-input-symbol`" v-if="index < values.length - 1">/</span>
          </div>
          <span class="placeholder" v-if="values.length<=0">请选择省/市/区/街道</span>
        </div>
        <i class="ivu-icon ivu-icon-ios-arrow-down" :class="`${prefixCls}__header-click-icon`"></i>
        <!--         <span :class="`${prefixCls}__header-click-icon`"></span>-->
      </div>
    </div>
    <div :class="`${prefixCls}__body`" v-if="show">
      <ul :class="`${prefixCls}__body-title`">
        <li :class="[classesTitleLevel, {'active': current === index}]" v-for="(tab, index) in tabs" :key="index" @click.top="handleClickTab(tab, index)">{{ tab.label }}</li>
      </ul>
      <ul :class="`${prefixCls}__body-content`">
        <li :class="[classesContentTag, {'active': activeContentTag(item)}]" v-for="(item, index) in list" :key="index" @click.top="handleClickItem(item, index)"> {{ item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
    // import { province, city, county, town, provinceObject, cityObject, countyObject, townObject } from './data/';

    import {directive as clickOutside} from '../../../directives/v-click-outside-x';
    const prefixCls = 'md-city';

    const ADDRESS_LEVEL = {
        PROVINCE:0,
        CITY: 1,
        COUNTY: 2,
        TOWN: 3
    };

    export default {
        name: 'city',
        props:{
            value:Object|Array,
            showError:{
                default: false,
                type: Boolean
            },
            capture: {
                type: Boolean,
                default () {
                    return !this.$IVIEW ? true : this.$IVIEW.capture;
                }
            },
            data:{
                province:[],
                city:[],
                county:[],
                town:[],
                provinceObject:{},
                cityObject:{},
                countyObject:{},
                townObject:{}
            }
        },
        directives: { clickOutside },
        computed:{
            classes() {
                return [
                    `${prefixCls}`,
                ];
            },
            classesHeaderClick() {
                return [
                    `${prefixCls}__header-click`,
                    {
                        [`${prefixCls}__header-click--error`]:this.showError
                    }
                ];
            },
            classesTitleLevel() {
                return [
                    `${prefixCls}__body-title-level`,
                    'w-25',
                ];
            },
            classesContentTag() {
                return [
                    `${prefixCls}__body-content-tag`,
                ];
            }
        },
        watch:{
            'current':{
                immediate: true,
                handler(val) {
                    this.getData(val);
                    if (this.list.length === 1 && !this.isClickTab) {
                        this.handleClickItem(this.list[0]);
                    }
                }
            },
            'value':{
                immediate: true,
                handler(newVal) {
                    let { provinceObject, cityObject, countyObject, townObject } = this.data
                    this.values = newVal.map((elem, index) => {
                        let id = Object.prototype.toString.call(elem) === '[object Object]' ? elem.key : elem;
                        if (index === ADDRESS_LEVEL.PROVINCE) {
                            return provinceObject[id];
                        } else if (index === ADDRESS_LEVEL.CITY) {
                            return cityObject[id];
                        } else  if (index === ADDRESS_LEVEL.COUNTY) {
                            return countyObject[id];
                        } else if (index === ADDRESS_LEVEL.TOWN) {
                            return townObject[id];
                        }
                    });
                }
            }
        },
        data() {
            return {
                prefixCls,
                current:0,
                code: '1',
                show: false,
                tabs:[
                    {
                        label: '省',
                        value: '',
                    },
                    {
                        label: '市',
                        value: '',
                    },{
                        label: '县/区',
                        value: '',
                    },{
                        label: '街道',
                        value: '',
                    }
                ],
                values:[],
                list: this.data.province,
                isClickTab:true,
            };
        },
        methods: {
            onClickOutside(event) {
                if (this.show) {
                    if (event.type === 'mousedown') {
                        event.preventDefault();
                        return;
                    }
                    event.preventDefault();
                    this.show = false;
                    this.isFocused = true;
                    this.$emit('on-clickoutside', event);
                }
            },
            disabledClickTab(index) {
                let prevIndex = index - 1;
                if (index < this.current) {
                    return false;
                }

                return this.values.length <= prevIndex || !this.values[prevIndex];
            },
            activeContentTag(item) {
                return !!this.values.length && !!this.values[this.current] && this.values[this.current].id === item.id;
            },
            getData(level) {
                let { province, city, county, town } = this.data;
                if (level === ADDRESS_LEVEL.PROVINCE) {
                    this.list = province;
                } else if (level === ADDRESS_LEVEL.CITY) {
                    let id = this.values[ADDRESS_LEVEL.PROVINCE].id;
                    this.list = city[id];
                } else  if (level === ADDRESS_LEVEL.COUNTY) {
                    let id = this.values[ADDRESS_LEVEL.CITY].id;
                    this.list = county[id];
                } else if (level === ADDRESS_LEVEL.TOWN) {
                    let id = this.values[ADDRESS_LEVEL.COUNTY].id;
                    this.list = town[id];
                }
            },
            handleClickTab(tab, index) {
                // e.stopPropagation();
                if (this.disabledClickTab(index)) {
                    return;
                }
                this.isClickTab = true;
                this.current = index;
            },
            handleClickItem(item) {
                // e.stopPropagation();
                this.isClickTab = false;
                this.updateValues(item);
            },
            updateValues(item) {
                this.values[this.current] = item;
                this.current++;
                if (this.current >= this.tabs.length) {
                    this.current = this.tabs.length-1;
                    this.show = false;
                }
                this.$emit('input', this.values.map(elem=>{
                    return {
                        key: elem.id,
                        value: elem.name,
                    };
                }));
            }
        }
    };
</script>
