export interface Subject {
  name: string;
}

export interface Student {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  grade: string;
  dob: string;
  subjects: Subject[];
  languages: any;
}
