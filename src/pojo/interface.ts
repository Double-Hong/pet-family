 interface comGoodsView{
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
export  type {comGoodsView}
export interface commodity{
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
 interface commodityType{
    id: number,
    name: string,
}
export type {commodityType}
export  interface brand{
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
    _5 = "售罄" , //售罄
    _6 = "已删除",
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
export interface addCommodityDTO{
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
    storageId: string,
    warehouseId: number,
    quantity: number,
}
export interface addQuantityForm{
    commodityId:number,
    quantity:number,
    warehouseId:number,
    storageId:string,
}