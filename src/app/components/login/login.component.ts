import { ServerConfig } from 'src/app/model/server-config';
import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';

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

  workingConfig!: ServerConfig;

  constructor(private service: ConfigService) {}

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
      // TODO: show success popup
      console.log('connected');
      return true;
    } else {
      // TODO: clear fields and show error message
      console.log('wrong credentials');
      return false;
    }
  }

  connect() {
    if (this.testConnection()) {
      // TODO: Redirect to main screen
    } else {
      // TODO: clear fields and show error message
    }
  }
}
