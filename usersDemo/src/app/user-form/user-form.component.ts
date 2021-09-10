import { Component, Input, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm : FormGroup;
  formHeader : string = 'Add User';
  selectedUser: any;
  btnText : string = 'Add';
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  websiteRegex ="((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";

  //@Input() user = user;
  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<any>, @Optional() @Inject(MAT_DIALOG_DATA) private data,
  private userService : UserService) { 
    this.selectedUser = data;
  }

  ngOnInit() {

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern(this.emailRegEx)]],
      phone: ['', Validators.required],
      website: ['', Validators.pattern('websiteRegex')]
    });

    if(this.selectedUser.type == 'U'){
      this.userForm.patchValue({
        name : this.selectedUser.name,
        email : this.selectedUser.email,
        phone : this.selectedUser.phone,
        website : this.selectedUser.website
      })
      this.formHeader = 'Update User';
      this.btnText = 'Update';
    }
  }

  addUpadteUser(){
    if(this.formHeader == 'Update User'){
      if(this.userForm.valid){
        let user = {
          name : this.f.name.value,
          email : this.f.email.value,
          phone : this.f.phone.value,
          website : this.f.website.value,
          id : this.selectedUser.id
        }
        this.userService.updateUser(user)
        .subscribe({
          next: data =>{
            //console.log(data)
            this.dialogRef.close()
          },
          error : error =>{
            console.log(error);
          }
        })
      }
    }else{
      if(this.userForm.valid){
      let user = {
        name : this.f.name.value,
        email : this.f.email.value,
        phone : this.f.phone.value,
        website : this.f.website.value
      }
      this.userService.addUser(user)
      .subscribe({
        next: data =>{
          //console.log(data)
          this.dialogRef.close()
        },
        error : error =>{
          console.log(error);
        }
      })
    }
    }
  }

  get f(){return this.userForm.controls}

}
