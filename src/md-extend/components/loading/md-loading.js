import Vue from 'vue';
import MdLoading from './index.vue';

MdLoading.newInstance = properties=>{
  const _props = properties || {};

  const Instance = new Vue({
    data:Object.assign({}, _props,{}),
    render(h){
      return  h(MdLoading, {
        props:_props
      })
    }
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const loading = Instance.$children[0];

  return {
    show() {
      loading.show = true;
      setTimeout(()=>{
        loading.show = false
      }, 2000)
    },
    remove() {
      loading.show = false;
    },
    component:loading,

    destroy () {
      document.body.removeChild(document.getElementsByClassName('md-loading')[0]);
    }
  }
};

export default MdLoading;
