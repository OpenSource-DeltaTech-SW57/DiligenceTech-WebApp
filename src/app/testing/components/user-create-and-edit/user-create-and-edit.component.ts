import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Users } from '../../model/users.entity';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-create-and-edit',
  templateUrl: './user-create-and-edit.component.html',
  styleUrl: './user-create-and-edit.component.scss'
})
export class UserCreateAndEditComponent {
  @Input() user: Users;
  @Input() editMode = false;
  @Output() userAdded = new EventEmitter<Users>();
  @Output() userUpdated = new EventEmitter<Users>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('userForm', {static:false}) userForm!: NgForm;
  constructor(){
    this.user = {} as Users;
  }

  private resetEditState(){
    this.editMode = false;
    this.userForm.resetForm();
    this.user = {} as Users;
  }

  // Event Handlers
  onSubmit() {
    if (this.userForm.form.valid) {
      if (this.editMode) {
        this.userUpdated.emit(this.user);
      } else {
        this.userAdded.emit(this.user);
      }
      this.resetEditState();
    } else {
      console.log('invalid data');
    }
  }

  onCancel() {
    this.resetEditState();
    this.editCanceled.emit();
  }
}
