import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserStatus } from '../models/user-status.enum';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [
    {
      name: 'ahmed',
      id: 1,
      email: 'a@test.com',
      phone: 4353453543,
      status: 'active',
    },
    {
      name: 'omar',
      id: 2,
      email: 'a@test.com',
      phone: 372636722,
      status: 'active',
    },
    {
      name: 'ali',
      id: 3,
      email: 'c@test.com',
      phone: 82736,
      status: 'soft_delete',
    },
    {
      name: 'heba',
      id: 4,
      email: 'h@test.com',
      phone: 82736,
      status: 'soft_delete',
    },
    {
      name: 'noura',
      id: 5,
      email: 'n@test.com',
      phone: 82736,
      status: 'soft_delete',
    },
  ];
  constructor() {}

  getUsers():Observable<User[]>{
      return of(this.users);
  }
  addUser(user:User):Observable<boolean>{
    let id = Math.max(...this.users.map(e=>e.id))+1;
    user.id = id;
    this.users.push(user);
    return of(true);
  }

  deleteUser(id:number):Observable<boolean>{
    this.users = this.users.filter(e=>e.id != id);
    return of(true);
  }

  editUser(user:User):Observable<boolean>{
    var userToEdit = this.users.find(e=>e.id==user.id);
    if(!userToEdit)
      return of(false);
    userToEdit.name = user.name;
    userToEdit.email = user.email;
    userToEdit.phone = user.phone;
    userToEdit.status = user.status;
    return of(true)
  }
  getUser(id:number):Observable<User|undefined>{
    return of(this.users.find(e=>e.id==id));
  }
}
