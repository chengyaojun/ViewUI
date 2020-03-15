<template>
    <div class="md-toolbar" :class="themeClassName">
        <div class="md-toolbar__left" :class="[classNames]">
           <!-- <md-icon type="menu" size="22" color="white" class="md-toolbar__left-item md-toolbar__left-menu cursor-pointer" v-if="!hideMenuBtn" @click="onClickMenuBtn"></md-icon>
            <div class="md-toolbar__left-item md-toolbar__left-brand cursor-pointer" v-if="!collapsed">
                <img src="../../../src/assets/logo.png" alt="icon" v-if="icon">
                <span class="title" v-if="title">{{ title }}</span>
            </div>-->
            <slot name="left">
                <md-icon type="md-menu" size="22" color="white" class="md-toolbar__left-item md-toolbar__left-menu cursor-pointer" v-if="!hideMenuBtn" @click.native="onClickMenuBtn"></md-icon>
                <div class="md-toolbar__left-item md-toolbar__left-brand cursor-pointer" v-if="!selfCollapsed">
                    <img src="../../../../assets/logo.png" alt="icon" v-if="icon">
                    <span class="md-toolbar__left-brand-title" v-if="title">{{ title }}</span>
                </div>
            </slot>
        </div>
        <div class="md-toolbar__content">
            <slot></slot>
        </div>
        <div class="md-toolbar__right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "md-toolbar",
    props:{
      icon:{
        type:String,
        default:''
      },
      title:{
        type:String,
        default:'',
      },
      hideMenuBtn:{
        type:Boolean,
        default:false,
      },
      collapsed:{
        type:Boolean,
        default:false,
      },
      theme:{
        type:String,
        default:'dark',
        validator:value=>{
          return ['dark', 'light'].indexOf(value) !== -1
        }
      }
    },
    computed:{
      themeClassName() {
        if (this.theme === 'dark') {
          return ["md-toolbar--dark"]
        }  else {
          return ["md-toolbar--light"]
        }
      }
    },
    watch:{
      collapsed:{
        immediate:true,
        handler(to) {
          this.selfCollapsed = to;
          if (to) {
            this.classNames = [
              'collapsed-width',
              'display-flex',
              'justify-main-center',
              'align-item-center',
            ]
          } else {
            this.classNames = ['expand-width']
          }
        }
      }
     /* collapsed(to) {
        this.selfCollapsed = to;
        console.log("=======", to);
        if (to) {
          this.classNames = [
            'collapsed-width',
            'display-flex',
            'justify-main-center',
            'align-item-center'
          ]
        } else {
          this.classNames = ['expand-width']
        }
      }*/
    },
    data(){
      return {
        classNames:['expand-width'],
        selfCollapsed:false,
      }
    },
    methods:{
      onClickMenuBtn() {
        this.selfCollapsed = !this.selfCollapsed;
        this.$emit('on-click-collapsed', this.selfCollapsed)
      }
    }
  }
</script>

<style scoped lang="less">
/*    @import "../../style/theme.less";
    .md-toolbar {
    height: 48px;
    align-items: center;
    display: flex;
        background: @blue-6;
    justify-content: space-between;
    !*padding: 0 16px;*!
    .collapsed-width {
        width: 80px;
        justify-content: center;
        .icon{
            margin:0 auto;
        }
    }
    .margin-0-auto{
        margin: 0 auto;
    }
    .expand-width{
        width: 250px;
    }
    &__left {
        height: inherit;
        display: flex;
        align-items: center;
        padding: 0 16px;
        background: @primary-7;

        !*background-color:darken(#1890ff, 10%);*!
        &-item {

        }
        &-menu {

        }
        &-brand {
            height: inherit;
            margin: 0 8px;
             display: flex;
            align-items: center;
            img {
                height: 40px;
                width: 40px;
            }
            &-title {
                font-size: 20px;
                font-weight: 500;
                letter-spacing: 0.02em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: white;
            }
        }

    }
    &__right {
        padding: 0 16px;
    }
}*/
</style>
