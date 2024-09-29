
export function toRupiah(total:number){  
  return "Rp"+total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}