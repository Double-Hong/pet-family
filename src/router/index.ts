import {createRouter, createWebHistory} from 'vue-router'
import AdminUserView from "@/views/AdminUser/AdminUserView.vue";
import RegularUserMain from "@/views/RegularUser/RegularUserMain.vue";
import CommodityDetail from "@/components/RegularUserComponents/CommodityDetail.vue";
import  Order from "@/components/RegularUserComponents/Order.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/admin',
            name: 'admin',
            component: AdminUserView,
        },
        {
            path: '/regularUserMain',
            name: 'regularUserMain',
            component: RegularUserMain
        },
        {
            path: '/CommodityDetail',
            name: 'CommodityDetail',
            component: CommodityDetail
        },
        {
            path: '/Order',
            name: 'Order',
            component: Order
        }
    ]
})

export default router
