/**
 * @interface IRepository
 * @description Interface ini digunakan untuk menjadi template pada class-class repository yang digunakan
 */
export interface IRepository{
    create(...params:any[]):any
    update(...params:any[]):any
    delete(...params:any[]):any
    get(...params:any[]):any
    fetch(...params:any[]):any
}