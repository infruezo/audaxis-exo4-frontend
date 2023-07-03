import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private baseUrl: string = 'http://localhost:9999/api/v1/audaxis';

  constructor(private http: HttpClient) {}

  public getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users/v2`);
  }

  public addUserToDB(email: string, name: String): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/add/${email}/${name}`, {});
  }

  public uploadFileToFTP(): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/upload`, {});
  }

  public getTableColumnsName(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/columns`);
  }

  public getOuputFilePath(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/filepath`);
  }
}
