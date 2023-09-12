import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  userId!:number;
  user!:User;
  userForm:FormGroup;
  isFormSubmitted: boolean = false;
  statuses:any[]=[
    {
    label: 'active',value:'active'
  },
  {
    label: 'soft_delete',value:'soft_delete'
  }] 
constructor(private fb:FormBuilder, private router : Router,   
  private route: ActivatedRoute, private usersService:UsersService
  ,private toastrService:ToastrService){
 this.route.params.subscribe(parms=>{
    this.userId = parms["id"]
  });

  this.userForm = fb.group({
    name:['',[Validators.maxLength(50),Validators.required]],
    email:['',[Validators.email,Validators.maxLength(50),Validators.required]],
    status:[this.statuses[0].value,Validators.required],
    phone:['',Validators.required],
  }); 
}



 ngOnInit(): void { 
  
  this.usersService.getUser(this.userId).subscribe(res=>{
    if(res){
      this.userForm.patchValue(res);
    }
    else{
      //TODO
    }
  })
      
 }

 OnSubmit() {
  this.isFormSubmitted = true;
  if (this.userForm.invalid) 
    return;
  let user = {...this.userForm.value,id:this.userId}
  this.usersService.editUser(user).subscribe(res=>{
    if(res){
      this.toastrService.success("User Edit Successfully");
      this.router.navigate(['/users'])
    }
  });
    
}

}
