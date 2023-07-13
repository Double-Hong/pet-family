export interface ComGoodsView{
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
export interface Commodity{
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
export interface CommodityType{
    id: number,
    name: string,
}
export  interface Brand{
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
