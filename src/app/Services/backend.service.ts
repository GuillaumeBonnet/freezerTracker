import { Injectable } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
const MOCK_ALIMENTS: any = require('../Mocks/Aliments.json');
@Injectable()
export class BackendService {

  listAliments: Aliment[] = MOCK_ALIMENTS;
  apiRoot: string = "http://localhost:8080";

  constructor(private http: Http) {}

  getAliments() : Observable<Response> {
    return this.http.get(this.apiRoot + '/aliments');    
  }

  saveAliment(alimentToSave: Aliment): Observable<Response> {
    return this.http.post(this.apiRoot + '/aliment', alimentToSave);
  }

  updateAliment(alimentToUpdate: Aliment): Observable<Response> {
    console.log('todo debug:[alimentToUpdate.id]', alimentToUpdate.id);
    console.log('todo debug:[alimentToUpdate]', alimentToUpdate);    

    return this.http.put(`${this.apiRoot}/aliment/${alimentToUpdate.id}`, alimentToUpdate);
  }

  delete(alimentToDelete: Aliment): Observable<Response> {
    return this.http.delete(`${this.apiRoot}/aliment/${alimentToDelete.id}`);
  }
}
