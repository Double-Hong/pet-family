import {defineStore} from "pinia";
import {ref} from "vue";
import type {adminInfo, merchantInfo} from "@/pojo/data-entity";

export const useUserStore = defineStore('merchant', () => {

    //管理员用户信息
    const adminUserInfo = ref<adminInfo>({
        administrator_id: 0, //管理员id
        user_rights: "",  //用户权限
        login_id: 0, //登录id
        username: "", //用户名
        password: "", //密码
        gender: "", //性别
        avatar: "", //头像
        phone: "", //电话
        email: "", //邮箱
    })
    const setAdminUserInfo = (adminInfo: adminInfo) => {
        adminUserInfo.value = adminInfo;
    }
    const getAdminUserInfo = () => {
        return adminUserInfo.value;
    }

    //商家用户信息
    const merchantUserInfo = ref<merchantInfo>({
        merchantUserId: 0,
        merchantName: "",
        merchantAddress: "",
        loginId: 0,
        username: "",
        password: "",
        gender: "",
        avatar: "",
        phone: "",
        email: "",
    })

    const setMerchantUserInfo = (merchantInfo: merchantInfo) => {
        merchantUserInfo.value = merchantInfo;
    }

    const getMerchantUserInfo = () => {
        return merchantUserInfo.value;
    }

    return {
        adminUserInfo,
        setAdminUserInfo,
        getAdminUserInfo,
        merchantUserInfo,
        setMerchantUserInfo,
        getMerchantUserInfo
    }
})
