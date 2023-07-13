export interface ComGoodsView{
    id: string,
    brandName: string,
    typeName:string,
    commodityName: string,
    price: number,
    photo: string,
    introduce: string,
    saleVolume: number,
    shopName: string,
    shopId: string,
    state: string,
}

export interface MerchantUser{
    merchantUserId: string,
    merchantName: string,
    merchantAddress: string,
    loginId: string,
}

export interface MerchantUserView{
    merchantUserId: number,
    merchantName: string,
    merchantAddress: string,
    loginId: string,
    username: string,
    password: string,
    gender: string,
    avatar:string,
    phone: string,
    email: string,
}
export enum comStatus{
    _1 = "待审核", //待审核
    _2 = "审核未通过", //审核未通过
    _3 = "未上架",  //未上架
    _4 = "已上架",  //已上架
    _5 = "售罄"  //售罄
}