import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private db: DbService
  ) {}

  usersList: User[] = [];

  newEmail: string = '';
  newName: string = '';

  feedback: string = '';

  ngOnInit(): void {
    // check login service from server
    if (!this.auth.getIsLoggedIn()) {
      this.router.navigate(['']);
    }

    this.getUsersList();
  }

  addUserToDB(): string {
    if (this.newEmail.length === 0) {
      this.feedback = 'Email field is required';
    } else {
      this.feedback = '';

      this.db
        .addUserToDB(this.newEmail, this.newName)
        .pipe()
        .subscribe((data) => {
          this.feedback = data;
          this.getUsersList();

          this.newEmail = '';
          this.newName = '';
          return data;
        });
    }

    return '';
  }

  getOutputFileLink() {
    return this.db.getOuputFilePath().subscribe((data) => {
      this.feedback = data;
    });
  }

  uploadToFTPServer() {
    return this.db.uploadFileToFTP().subscribe((data) => {
      console.log(data);
    });
  }

  getUsersList() {
    this.db.getUsersList().subscribe((users) => {
      this.usersList = users;
    });
  }

  logoutFromMainScreen() {
    this.auth.setIsLoggedIn(false);
    this.router.navigate(['']);
  }
}
