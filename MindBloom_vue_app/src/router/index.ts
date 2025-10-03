import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import LessonsView from '../views/LessonsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: HomeView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/lessons',
      name: 'lessons',
      component: LessonsView,
    },
    // {
    //   path: '/lesson/:id',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: LessonPage,
    //     children: [
    //       { path: 'expand', component: EditLessonModal }
    //     ]
    // },
  ],
})

export default router
