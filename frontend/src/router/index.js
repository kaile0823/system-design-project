import { createRouter, createWebHistory } from 'vue-router'

import MainView from '@/views/MainView.vue'

import PrimeDevView from '@/views/pages/DevView.vue'
import PrimeHomeView from '@/views/pages/HomeView.vue'
import PrimeProductView from '@/views/pages/ProductView.vue'
import PrimePostView from '@/views/pages/PostView.vue'
import PrimeAdminView from '@/views/pages/AdminView.vue'
import CartView from '@/views/pages/CartView.vue'
import UserView from '@/views/pages/UserView.vue'

import UsersView from '@/views/adminpages/UsersView.vue'
import DatabaseView from '@/views/adminpages/ItemsView.vue'
import OrdersView from '@/views/adminpages/OrdersView.vue'
import CartsView from '@/views/adminpages/CartsView.vue'
import StatisticsView from '@/views/adminpages/StatisticsView.vue'
import SettingsView from '@/views/adminpages/SettingsView.vue'

import RegisterView from '@/views/user/RegisterView.vue'
import LogInView from '@/views/user/LogInView.vue'
import ForgotPasswordView from '@/views/user/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/user/ResetPasswordView.vue'

const routes = [
  { path: '/user',
    children: [
      { path: 'login', component: LogInView },
      { path: 'register', component: RegisterView },
      { path: 'forgot-password', component: ForgotPasswordView },
      { path: 'reset-password', component: ResetPasswordView },
    ]
   },
  {
    path: '/', component: MainView,
    children: [
      { path: 'dev', component: PrimeDevView },
      { path: '', component: PrimeHomeView },
      { path: 'product', component: PrimeProductView },
      { path: 'post', component: PrimePostView },
      { path: 'cart', component: CartView },
      { path: 'user', component: UserView },
      {
        path: 'admin', component: PrimeAdminView,
        children: [
          { path: 'users', component: UsersView },
          { path: 'items', component: DatabaseView },
          { path: 'orders', component: OrdersView },
          { path: 'carts', component: CartsView },
          { path: 'statistics', component: StatisticsView },
          { path: 'settings', component: SettingsView },
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