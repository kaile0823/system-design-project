import { createRouter, createWebHistory } from 'vue-router'

import UserView from '@/views/user/UserView.vue'
import MainView from '@/views/MainView.vue'

import PrimeDevView from '@/views/pages/DevView.vue'
import PrimeHomeView from '@/views/pages/HomeView.vue'
import PrimeProductView from '@/views/pages/ProductView.vue'
import PrimePostView from '@/views/pages/PostView.vue'
import PrimeAdminView from '@/views/pages/AdminView.vue'

import UsersView from '@/views/adminpages/UsersView.vue'
import DatabaseView from '@/views/adminpages/DatabaseView.vue'
import StatisticsView from '@/views/adminpages/StatisticsView.vue'
import SettingsView from '@/views/adminpages/SettingsView.vue'

const routes = [
  { path: '/', component: UserView },
  {
    path: '/main', component: MainView,
    children: [
      { path: 'dev', component: PrimeDevView },
      { path: '', component: PrimeHomeView },
      { path: 'product', component: PrimeProductView },
      { path: 'post', component: PrimePostView },
      {
        path: 'admin', component: PrimeAdminView,
        children: [
          { path: 'users', component: UsersView },
          { path: 'database', component: DatabaseView },
          { path: 'statistics', component: StatisticsView },
          { path: 'settings', component: SettingsView }
        ]
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router