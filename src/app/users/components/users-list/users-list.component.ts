import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users:User[]=[];
  /**
   *
   */
  constructor(private usersService:UsersService,private toastrService:ToastrService) {
  }

  ngOnInit(): void {
    this.getUsers();
  } 

  Delete(id : number){
    this.usersService.deleteUser(id).subscribe(res=>{
      if(res)
      {
         this.getUsers();
          this.toastrService.success('User Deleted Successfully')
      }
      else{
        //TODO
        this.toastrService.error("Failed To Delete User")
      }
    })
  }

  getUsers(){
    this.usersService.getUsers().subscribe(res=>this.users = res);
  }
}
