import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          redirect: '/merch-grid-view'
      },
    {
        path: '/merch-grid-view',
        name: 'MerchGridView',
        component: () => import('../views/MerchantUser/MerchGridView.vue')
    }
  ]
})

export default router
