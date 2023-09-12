import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { UsersListComponent } from './components/users-list/users-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MainLayoutComponent } from '../components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: UsersListComponent },
      { path: 'add', component: AddUserComponent },
      { path: 'edit/:id', component: EditUserComponent }
    ]
  } 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
