//商店信息
export interface shopInfo {
    id: number; //商店id
    name: string; //商店名称
    introduce: string; //商店介绍
    merchantId: number; //所属商家id
    address: string; //商店地址
    moreAddress?: string; //商店详细地址
    avatar: string; //商店头像
    shopStatus: string; //商店状态
}

//商家用户信息
export interface merchantInfo {
    merchantUserId: number;  //商家用户id

    merchantName: string;  //商家名称

    merchantAddress: string;  //商家地址

    loginId: number;  //登录id

    username: string;  //用户名

    password: string;  //密码

    gender: string;  //性别

    avatar: string;  //头像

    phone: string;  //电话

    email: string;  //邮箱
}

//管理员用户信息
export interface adminInfo {
    administratorId: number; //管理员id

    userRights: string;  //用户权限

    loginId: number; //登录id

    username: string; //用户名

    password: string; //密码

    gender: string; //性别

    avatar: string; //头像

    phone: string; //电话

    email: string; //邮箱
}

//普通用户基本信息
export interface regularInfo {
    regularUserId: number; //普通用户id
    birthday: string; //生日
    loginId: number; //登录id
    regularName: string; //昵称
    nickname: string; //昵称
    username: string; //用户名
    password: string; //密码
    gender: string; //性别
    avatar: string; //头像
    phone: string; //电话
    email: string; //邮箱
    grade: string; //等级
}

//统计商品种类及其数量
export interface comTypeCount {
    shopId: number,  // 商店id
    comTypeName: string,  // 商品种类名称
    comTypeCount: number  // 商品种类数量
}

//商品视图信息
export interface comGoodsView {
    brandName: string,
    commodityName: string,
    id: number,
    introduce: string,
    photo: string,
    price: number,
    saleVolume: number,
    shopId: number,
    shopName: string,
    typeName: string,
    state: string,
}

export enum comStatus {
    _1 = "待审核", //待审核
    _2 = "审核未通过", //审核未通过
    _3 = "未上架",  //未上架
    _4 = "已上架",  //已上架
    _5 = "售罄"  //售罄
}

//购物车商品信息
export interface cartGoodsView {
    id: number;
    name: string,
    photo: string,
    introduce: string,
    price: number,
    shopId: number,
    regularUserId: number,
    shoppingCartId: number,
    commodityNumber: number,
    avatar: string,
    shopName: string,
}

//订单信息
export interface orderInfo {
    id: number,  //订单id
    time: string,  //订单时间
    address: string, //订单地址
    phone: string,  //订单电话
    totalPrice: number,  //订单总价
    name: string,  //订单收货人姓名
    state: string,  //订单状态
    personId: number,  //订单收货人id
}

//订单商品信息
export interface orderGoodsInfo {
    id: number,  //订单商品id
    orderId: number,  //订单id
    commodityId: number,  //商品id
    num: number,  //商品数量
    totalPrice: number,  //商品总价
    shoppingCartId?: number,  //购物车id
}

//地址信息
export interface address {
    userId: number,
    linkman: string,
    linkmanPhone: string,
    address: string,
    detailAddress: string,
    addressId: number,
}
