import {createRouter, createWebHistory} from 'vue-router'

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
            component: () => import('../views/MerchantUser/MerchGridView.vue'),
            children: [
                {
                    path: '',
                    redirect: '/merch-grid-view/all-shops'
                },
                {
                    path: 'all-shops',
                    name: 'allShops',
                    component: () => import('../components/MerchantUserComponents/MerchantMain/MainAllowShops.vue')
                },
                {
                    path: 'shop-detail/:shopId',
                    name: 'shopDetail',
                    component: () => import('../components/MerchantUserComponents/MerchantMain/MerchantMainView.vue'),
                    children: [
                        {
                            path: 'base-info',
                            name: 'baseInfo',
                            component: () => import('../components/MerchantUserComponents/MerchantMain/ManageOneShop.vue')
                        }
                    ]
                }
            ]
        }
    ]
})

export default router
