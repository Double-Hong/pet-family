import {createRouter, createWebHistory} from 'vue-router'
import AdminUserView from "@/views/AdminUser/AdminUserView.vue";
import RegularUserMain from "@/views/RegularUser/RegularUserMain.vue";
import CommodityDetail from "@/components/RegularUserComponents/CommodityDetail.vue";
import Order from "@/components/RegularUserComponents/Order.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
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
            meta: {
                requireAuth: true  // 需要登录权限
            },
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
                        // {
                        //     path: '',
                        //     redirect: 'shop-detail/:shopId/base-info'
                        // },
                        {
                            path: 'base-info',
                            name: 'baseInfo',
                            component: () => import('../components/MerchantUserComponents/MerchantMain/ManageOneShop.vue')
                        },
                        {
                            path: 'order-manage',
                            name: 'order-manage',
                            component: () => import('../views/MerchantUser/OrderManage.vue')
                        },
                        {
                            path: 'comments',
                            name: 'comments',
                            component: () => import('../views/MerchantUser/CommentsView.vue')
                        },
                        {
                            path: 'operation',
                            name: 'operation',
                            component: () => import('../views/MerchantUser/Operation.vue')
                        }
                        // {
                        //     path:'ListingProducts',
                        //     name:'ListingProducts',
                        //     component: () => import('../views/MerchantUser/ListingProductsView.vue')
                        // },
                        // {
                        //     path:'RemoveProducts',
                        //     name:'RemoveProducts',
                        //     component: () => import('../views/MerchantUser/RemovalOfProductsView.vue')
                        // },
                    ]
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminUserView,
        },
        {
            path: '/regularUserMain',
            name: 'regularUserMain',
            component: RegularUserMain,
            meta: {
                requireAuth: true  // 需要登录权限
            }

        },
        {
            path: '/shopping-cart',
            name: 'shoppingCart',
            component: () => import('@/components/RegularUserComponents/ShoppingCart/RegularShoppingCart.vue'),
            meta: {
                requireAuth: true  // 需要登录权限
            },
        },
        {
            path: '/CommodityDetail',
            name: 'CommodityDetail',
            component: CommodityDetail,
            meta: {
                requireAuth: true  // 需要登录权限
            },
        },
        {
            path: '/Order',
            name: 'Order',
            component: Order,
            meta: {
                requireAuth: true  // 需要登录权限
            },
        },
        {
            path: '/myOrder',
            name: 'myOrder',
            component: () => import('../views/RegularUser/MyOrder.vue'),
            meta: {
                requireAuth: true  // 需要登录权限
            },
        },
        {
            path: '/merchantinfo',
            name: 'merchantinfo',
            component: () => import('../views/MerchantUser/MerchantInfo.vue'),
            meta: {
                requireAuth: true  // 需要登录权限
            },
        },
        {
            path: '/regularInfoView',
            name: 'regularInfoView',
            component: () => import('../views/RegularUser/RegularInfoView.vue'),
            meta: {
                requireAuth: true  // 需要登录权限
            },
        },
        {
            path: '/regularAddress',
            name: 'regularAddress',
            component: () => import('../views/RegularUser/RegularAddress.vue'),
            meta: {
                requireAuth: true  // 需要登录权限
            },
        },
        {
            path: '/selfAdmin',
            name: 'selfAdmin',
            component: () => import('../views/AdminUser/SelfAdmin.vue'),
            meta: {
                requireAuth: true  // 需要登录权限
            },
        },
        {
            path: '/shopDetail',
            name: 'regularShopDetail',
            component: () => import('../components/RegularUserComponents/ShopDetail.vue'),
            meta: {
                requireAuth: true  // 需要登录权限
            },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue')
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
