import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/homepage'
import DashBoard from '@/components/dashboard'
import Accounts from '@/components/accounts'
import Opportunities from '@/components/opportunities'
import Lineitmes from '@/components/lineitmes'
import Forecast from '@/components/forecast'
import ViewTaskModule from '@/components/viewtaskmodule'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: DashBoard
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashBoard
        },
        {
          path: '/accounts',
          name: 'accounts',
          component: Accounts
        },
        {
          path: '/opportunities',
          name: 'opportunities',
          component: Opportunities
        },
        {
          path: '/lineitmes',
          name: 'lineitmes',
          component: Lineitmes
        },
        {
          path: '/forecast',
          name: 'forecast',
          component: Forecast
        },
        {
          path: '/viewtaskmodule/:data',
          name: 'viewtaskmodule',
          component: ViewTaskModule
        }
      ]
    }
  ]
})
