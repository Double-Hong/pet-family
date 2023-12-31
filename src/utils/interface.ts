import login from "@/views/Login.vue";

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
    state:string,
}
export interface commodity {
    brandId: number,
    id: number,
    introduce: string,
    name: string,
    photo: string,
    price: number,
    saleVolume: number,
    shopId: number,
    state: string,
    typeId: number,
}
export interface commodityType {
    id: number,
    name: string,
}
export  interface brand {
    id: number,
    name: string,
    introduce: string,
    brandAvatarUrl: string,
}
export interface audit{
    id: string,
    auditState: string,
    auditPerson: string,
    keyWord: string,
    applicant: string,
    content: string,
    applicationRemark: string,
    applicationPhone: string,
    auditType: string,
}

export enum comStatus{
    _1 = "待审核", //待审核
    _2 = "审核未通过", //审核未通过
    _3 = "未上架",  //未上架
    _4 = "上架中",  //上架中
    _5 = "售罄"  //售罄
}

export interface warehouse{
    warehouseId: number,
    warehouseName: string,
    warehousePhone: string,
    warehousePrincipal: string,
    warehouseAddress: string,
}
export interface storage{
    storageId: string,
    warehouseId: number,
    commodityId: number,
    quantity: number,
}

export interface addQuantityForm{
    commodityId:number,
    quantity:number,
    warehouseId:number,
    storageId:string,
}

export interface commentView{
    orderId: number,
    time: string,
    address: string,
    phone: string,
    totalPrice: number,
    name: string,
    state: string,
    personId: number,
    commentsId: number,
    commentsContent: string,
    commentsPhoto: string,
    commodityId: number,
    reply: string,
    regularName: string,
    nickname: string,
    grade: number,
}

export interface login{
    loginId:string,
    password:string,
    username:string,
    gender:string,
    avatar: string,
    phone:string,
    email:string,
    grade:string,
}

export  interface register{
    loginId:string,
    password:string,
    username:string,
    gender:string,
    avatar: string,
    phone:string,
    email:string,
    grade:string,
    birthday?:string,
    regularName?:string,
    nickname?:string,
    merchantName?:string,
    merchantAddress?:string,
}
