// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';
import './common/infiniteScroll'; // 无限滚动指令
import './common/directive'; // 自定义的指令
import './common/filter'; // 自定义的过滤器

if (process.env.NODE_ENV === 'production') {
  if (window.location.protocol !== 'https:') {
    window.location.protocol = 'https:';
  }
}
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.productionTip = false;
// 动画暂时不用
// import 'vueg/css/transition-min.css'
// import vueg from 'vueg';
// Vue.use(vueg, router, {
//   forwardAnim: 'fadeInRight',
//   duration: 0.2
// });

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

