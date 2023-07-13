import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: '/',
        //     redirect: '/'
        // },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/forget',
            name: 'forget',
            component: () => import('../views/Forget.vue')
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
                            path: '',
                            redirect: 'shop-detail/:shopId/base-info'
                        },
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

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (localStorage.getItem("token")) {  // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/login',
            })
        }
    } else {
        next();
    }
})
export default router
