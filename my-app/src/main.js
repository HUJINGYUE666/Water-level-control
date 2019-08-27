import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/js/rem.js'
import '@/assets/css/reset.css'
import {Row,Col,Icon,Table,TableColumn,PageHeader,Divider,Input,Autocomplete,Carousel,CarouselItem} from 'element-ui'
Vue.use(Row).use(Col).use(Icon).use(Table).use(TableColumn).use(PageHeader).use(Divider).use(Input).use(Autocomplete).use(Carousel).use(CarouselItem)
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import '@/assets/css/reset.css'
import '@/assets/js/rem.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
