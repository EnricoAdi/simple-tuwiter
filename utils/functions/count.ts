export const countTotalPembelian = (cart:BuyCart[], isDiscount:boolean, discountType:string, discount:number)=>{
  let tempTotal = cart.reduce((acc, curr)=>acc+curr.subtotal, 0) 
  if(isDiscount){
    if(discountType==="NOMINAL"){ tempTotal-=discount }
    else {
      const discountValue = parseInt(((discount/100)*tempTotal).toString())
      tempTotal-=discountValue
    }
  }
  return tempTotal
}
export const countTotalPenjualan = (cart:SellCart[])=>{
  return cart.reduce((acc, curr)=>acc+curr.subtotal, 0)
}