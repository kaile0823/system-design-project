import { createRouter, createWebHistory } from 'vue-router'
import TheWelcomeView from '@/views/TheWelcomeView.vue'
import TodoView from '@/views/TodoView.vue'

import PrimeHomeView from '@/views/PrimeHomeView.vue'
import PrimeAdminView from '@/views/PrimeAdminView.vue'

const routes = [
  // { path: '/', component: TheWelcomeView },
  // { path: '/todo-app', component: TodoView }
  { path: '/', component: PrimeHomeView },
  { path: '/admin', component: PrimeAdminView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router