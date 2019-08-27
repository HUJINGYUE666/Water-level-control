import Vue from 'vue'
import Router from 'vue-router'
import PartFirst from "@/views/PartFirst.vue";
import StatisticsMode from '@/views/swiperOne/StatisticsMode.vue'
import UnitInformation from '@/views/swiperOne/UnitInformation.vue'
import FunctionSet from '@/views/swiperOne/FunctionSet.vue'
import Sub from '@/views/swiperOne/Sub.vue'
import MapMode from '@/views/swiperOne/MapMode.vue'
import AreaTotal from '@/views/swiperOne/AreaTotal.vue'
import BasinTotal from '@/views/swiperOne/BasinTotal.vue'
import Login from './views/login/Login.vue'
import Second from './views/Second/Second.vue'
import History from './views/Second/next/history.vue'
import Near from './views/Second/next/near.vue'
import Survey from './views/Second/next/survey.vue'
import More from './views/Second/next/more.vue'
import Third from './views/third/Third.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/first",
      component:PartFirst
    },
    {
      path:"/statisticsmode",
      component:StatisticsMode
    },
    {
      path:"/statisticsmode/sub",
      component:Sub
    },
    {
      path:"/statisticsmode/mapmode",
      component:MapMode
    },
    {
      path:"/statisticsmode/areatotal",
      component:AreaTotal
    },
    {
      path:"/statisticsmode/basintotal",
      component:BasinTotal
    },
    {
      path:"/functionset",
      component:FunctionSet
    },
    {
      path:"/unitinformation/:stationid",
      component:UnitInformation
    },
    {
      path:'/',
      component:Login
    },
    {
      path:'/second',
      component:Second
    },
    {
      path:'/history',
      component:History
    },
    {
      path:'/near',
      component:Near
    },
    {
      path:'/survey',
      component:Survey
    },
    {
      path:'/more',
      component:More
    },
    {
      path:'/third',
      component:Third
    }
  ]
})
