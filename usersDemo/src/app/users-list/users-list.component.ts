import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatDialog } from '@angular/material';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersList: [];
  constructor(private userService: UserService, private dialog: MatDialog) { 

  }

  ngOnInit() {
    this.fetchUsers()
  }

  fetchUsers(){
    this.userService.getUsersList()
    .subscribe({
      next : data =>{
        console.log(data)
        this.usersList = data;
      },
      error : error =>{
        console.log(error);
      }
    })
  }

  openUserForm(user, type){

    if(type == 'D'){
      const dialogRef = this.dialog.open(ConfirmPopupComponent,{
        data: user
      });

      dialogRef.afterClosed().subscribe(() => {
        this.fetchUsers()
      })

    }else if(type == 'U'){
      user.type ='U';
      const dialogRef = this.dialog.open(UserFormComponent,{
        data: user
      });
      dialogRef.afterClosed().subscribe(() => {
        this.fetchUsers()
      })
    }else{
      user ={type: 'A'};
      const dialogRef = this.dialog.open(UserFormComponent,{
        data: user
      });
      dialogRef.afterClosed().subscribe(() => {
        this.fetchUsers()        
      })
    }
  }

}
