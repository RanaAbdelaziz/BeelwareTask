export interface User{
    id:number,
    name:string,
    email:string,
    phone:number,
    status:'active'|'soft_delete'
}