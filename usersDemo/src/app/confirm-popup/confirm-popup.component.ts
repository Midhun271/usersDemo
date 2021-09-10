import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit {

  selectedUser: any;
  constructor(private dialogRef: MatDialogRef<any>, @Optional() @Inject(MAT_DIALOG_DATA) private data,
    private userService : UserService) { 
    this.selectedUser = data;
    console.log(this.selectedUser);
  }

  ngOnInit() {
  }

  deleteUser(){
    this.userService.deleteUser(this.selectedUser.id)
    .subscribe({
      next: data =>{
        this.dialogRef.close()
      },
      error : error =>{
        console.log(error);
      }
    })
  }

}
