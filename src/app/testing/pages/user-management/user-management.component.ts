import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Users } from '../../model/users.entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit, AfterViewInit{

  // Attributes
  userData: Users;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "name", "age", "address", "actions"];
  @ViewChild(MatPaginator, {static:false}) paginator !: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  isEditMode: boolean;

  //Constructor
  constructor(private userService: UsersService) {
    this.isEditMode = false;
    this.userData = {} as Users;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods

  onEditItem(element: Users) {
    this.isEditMode = true;
    this.userData = element;
  }

  // CRUD Actions

  onDeleteItem(element: Users) {
    this.deleteUser(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllUsers();
  }

  onUsersAdded(element: Users) {
    this.userData = element;
    this.createUser();
    this.resetEditState();
  }

  onUsersUpdated(element: Users) {
    this.userData = element;
    this.updateUser();
    this.resetEditState();
  }

  // UI Event Handlers

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private resetEditState(): void {
    this.isEditMode = false;
    this.userData = {} as Users;
  }

  private getAllUsers() {
    this.userService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createUser() {
    this.userService.create(this.userData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((student: Users) => {
        return student;
      });
    });
  };

  // Lifecycle Hooks

  private updateUser() {
    let studentToUpdate = this.userData;
    this.userService.update(this.userData.id, studentToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((student: Users) => {
        if (student.id === response.id) {
          return response;
        }
        return student;
      });
    });
  };

  private deleteUser(studentId: number) {
    this.userService.delete(studentId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((student: Users) => {
        return student.id !== studentId ? student : false;
      });
    });
  };

}
