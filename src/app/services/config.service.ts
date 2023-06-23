import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerConfig } from '../model/server-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private baseUrl: string = 'http://localhost:9999/api/v1/audaxis';

  constructor(private http: HttpClient) {}

  public getServerConfig(): Observable<ServerConfig> {
    return this.http.get<ServerConfig>(this.baseUrl + '/config');
  }
}
