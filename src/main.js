import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import VueHighcharts from 'vue-highcharts';
import "babel-polyfill";

Vue.use(ElementUI);
Vue.use(VueHighcharts)

Vue.prototype.$axios = axios;
// Vue.prototype.$axios.defaults.baseURL = baseUrl

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
