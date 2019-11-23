import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StudentListComponent } from '../student-list/student-list.component';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
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
