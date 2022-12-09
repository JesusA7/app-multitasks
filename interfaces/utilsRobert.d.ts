import { Timestamp } from "firebase/firestore"

export interface IPurchase{
    store: string,
    supplier: string,
    paymentMethod:string,
    purchaseDate: Timestamp,
    purchaseDetail:Array<IPurchaseDetail>,
}

export interface IPurchaseDetail{
    purchaseDetailId: number,
    supplyId: number,
    quantity: number,
    price:number,
    description:string,
}