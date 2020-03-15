<template>
  <Row class="md-loading">
    <Col class="demo-spin-col" span="8" v-show="show">
      <Spin fix class="spin">
        <Icon type="ios-loading" color="#3f51b5" size=50 class="demo-spin-icon-load"></Icon>
      </Spin>
    </Col>
  </Row>
</template>

<script>
    export default {
        // props:{
        //   show:{
        //     type:Boolean,
        //     default:false,
        //   },
        // },
        name: "loading",
        data () {
          return {
            show:false,
          }
        },
        methods:{
        }
    }
</script>

<style lang="less" less>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    /*position: relative;*/
    /*border: 1px solid #eee;*/

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .spin {
    background: none;
  }
</style>
