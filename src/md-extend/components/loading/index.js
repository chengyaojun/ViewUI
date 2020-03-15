// import Vue from 'vue';
// import MdLoading from './index.vue';
//
// export default {
//     install(Vue, defaultOptions = {}) {
//       const CONSTRUCTOR = Vue.extend(MdLoading);
//       let node = new CONSTRUCTOR;
//       let vm = node.$mount().$el;
//
//       function loading(show=true) {
//         node.show = show;
//         if (node.show) {
//           document.body.appendChild(vm)
//         }
//       }
//
//       Vue.loading = Vue.prototype.$loading = loading;
//     }
// }

import MdLoading from './md-loading';


let mdLoadingInstance;


function getLoadingInstance (render = undefined) {
  mdLoadingInstance = mdLoadingInstance || MdLoading.newInstance({
    render: render
  });

  return mdLoadingInstance;
}

function loading (options) {
  const render = ('render' in options) ? options.render : undefined;
  let instance  = getLoadingInstance(render);

  instance.show(options);
}

MdLoading.show = function (props = {}) {
  return loading(props);
};
MdLoading.hide = function () {
  if (!mdLoadingInstance) return false;

  const instance = getLoadingInstance();

  instance.remove(() => {
    mdLoadingInstance = null;
  });
};

export default MdLoading
