import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm:FormGroup;
  isFormSubmitted: boolean = false;
  statuses:any[]=[
    {
    label: 'active',value:'active'
  },
  {
    label: 'soft_delete',value:'soft_delete'
  }]
  constructor(private fb:FormBuilder, private userSerive:UsersService,private toastrSerive:ToastrService,private router:Router){
    this.userForm = fb.group({
      name:['',[Validators.maxLength(50),Validators.required]],
      email:['',[Validators.email,Validators.maxLength(50),Validators.required]],
      status:[this.statuses[0].value,Validators.required],
      phone:['',Validators.required],
    }); 
  }

  OnSubmit() {
    this.isFormSubmitted = true;
    if (this.userForm.invalid) 
      return;
    
    this.userSerive.addUser(this.userForm.value).subscribe(res=>{
      if(res){
        this.toastrSerive.success("User Added Successfully");
        this.router.navigate(['/users'])
      }
    });
      
  }
}
