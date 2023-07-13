import {createRouter, createWebHistory} from 'vue-router'
import AdminUserView from "@/views/AdminUser/AdminUserView.vue";
import RegularUserMain from "@/views/RegularUser/RegularUserMain.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/admin',
            name: 'admin',
            component: AdminUserView,
        },
        {
            path: '/',
            name: 'regularUserMain',
            component: RegularUserMain
        }
    ]
})

export default router
