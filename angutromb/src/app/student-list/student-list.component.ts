import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Student } from "../student";
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('hidden', style({ opacity: 0 })),
      state('shown', style({ opacity: 1 })),      
      transition('hidden => shown', animate('1000ms'))
    ])
  ]

})

export class StudentListComponent implements OnInit {
  students: Student[] = [];

  fadeIn = true;

  visiblityState = 'hidden';

  newStudent: string;

  private refreshStudents() {
    const students = localStorage.getItem('students')
    this.students = students ? JSON.parse(students) : []
    
  }


  saveStudents() {
    localStorage.setItem('students', JSON.stringify(this.students))
    
  }


  deleteStudents(student: Student) {
    

    // setTimeout(() => (this.students = this.students.filter(s => s.id !== student.id)), ANIMATION_TIME + 50)

    this.students = this.students.filter(s => s.id !== student.id)
    this.saveStudents()
  
  }

  // Ouverture du dialog détail du profil
  openDialogShowStudent(student : Student): void {
    const dialogRef = this.dialog.open(StudentComponent, {
      width:'30em',
      data: {
         id : student.id,
         avatar : student.avatar,
         firstName : student.firstName,
         lastName: student.lastName,
         email : student.email,
         gender : student.gender,
         grade : student.grade,
         dob : student.dob
      }
    });
  }     
  constructor(public dialog : MatDialog) {}

  ngOnInit() {
    
    console.log(this.fadeIn)
    // setTimeout(() => this.refreshStudents(), ANIMATION_TIME + 50)
    this.refreshStudents()  
    if (this.visiblityState == "hidden") {
      setTimeout(() => this.visiblityState = "shown")
    }
    
    
  }

}

@Component({
  selector: 'app-student',
  templateUrl: './studentDialog.html',
  styleUrls: ['./studentDialog.css']
})
export class StudentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentListComponent) {}

    closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}

