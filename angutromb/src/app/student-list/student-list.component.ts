import { Component, OnInit } from '@angular/core';
import { Student } from "../student";



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  newStudent: string;

  private refreshStudents() {
    const students = localStorage.getItem('students')
    this.students = students ? JSON.parse(students) : []
  }

  saveStudents() {
    localStorage.setItem('students', JSON.stringify(this.students))
  }

  deleteStudents(student: Student) {
    this.students = this.students.filter(s => s.id !== student.id)
    this.saveStudents()
  }

  constructor() { }

  ngOnInit() {
    this.refreshStudents();
  }

}
