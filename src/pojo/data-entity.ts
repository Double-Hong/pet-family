//商店信息
export interface shopInfo {
    id: number; //商店id
    name: string; //商店名称
    introduce: string; //商店介绍
    merchantId: number; //所属商家id
    address: string; //商店地址
    avatar: string; //商店头像
}

//商家用户信息
export interface merchantInfo {
    merchantUserId: number;

    merchantName: string;

    merchantAddress: string;

    username: string;

    password: string;

    gender: string;

    avatar: string;

    phone: string;

    email: string;
}


export enum comStatus{
    _1 = "待审核", //待审核
    _2 = "审核未通过", //审核未通过
    _3 = "未上架",  //未上架
    _4 = "已上架",  //已上架
    _5 = "售罄"  //售罄
}
