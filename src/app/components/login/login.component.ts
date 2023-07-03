import { ServerConfig } from 'src/app/model/server-config';
import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  host: string = '';
  port!: number;
  sid: string = '';
  user: string = '';
  password: string = '';

  feedback: string = '';

  workingConfig!: ServerConfig;

  constructor(
    private service: ConfigService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getServerConfig().subscribe((data) => {
      this.workingConfig = new ServerConfig(
        data.host,
        data.user,
        data.password,
        data.port,
        data.sid
      );
    });
  }

  testConnection(): boolean {
    if (
      this.host === this.workingConfig.host &&
      this.user === this.workingConfig.user &&
      this.password === this.workingConfig.password &&
      this.port === this.workingConfig.port &&
      this.sid === this.workingConfig.sid
    ) {
      this.feedback = 'Connected!';
      return true;
    } else {
      this.feedback = 'Wrong Credentials';
      return false;
    }
  }

  connect() {
    if (this.testConnection()) {
      this.auth.setIsLoggedIn(true);
      this.router.navigate(['main']);
    } else {
      this.auth.setIsLoggedIn(false);
    }
  }

  fillFormData() {
    this.host = this.workingConfig.host;
    this.user = this.workingConfig.user;
    this.password = this.workingConfig.password;
    this.port = this.workingConfig.port;
    this.sid = this.workingConfig.sid;
  }
}
