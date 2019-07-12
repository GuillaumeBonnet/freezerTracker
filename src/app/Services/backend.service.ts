import { Injectable } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { HttpClient, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
const MOCK_ALIMENTS: any = require('../Mocks/Aliments.json');
@Injectable()
export class BackendService {

  listAliments: Aliment[] = MOCK_ALIMENTS;
  apiRoot: string = environment.API_ROOT_URL;
  freezerId: Number = 114;
  options = { headers: {'Content-Type': 'application/json'}};

  constructor(private http: HttpClient) {}

  getAliments() : Observable<Object> {
    return this.http.get(`${this.apiRoot}/freezers/${this.freezerId}/aliments`, this.options)
  }

  saveAliment(alimentToSave: Aliment): Observable<Object> {
    return this.http.post(`${this.apiRoot}/freezers/${this.freezerId}/aliments`, alimentToSave, this.options);
  }

  updateAliment(alimentToUpdate: Aliment): Observable<Object> {
    console.log('todo debug:[alimentToUpdate.id]', alimentToUpdate.id);
    console.log('todo debug:[alimentToUpdate]', alimentToUpdate);    

    return this.http.put(`${this.apiRoot}/freezers/${this.freezerId}/aliments/${alimentToUpdate.id}`, alimentToUpdate, this.options);
  }

  delete(alimentToDelete: Aliment): Observable<Object> {
    return this.http.delete(`${this.apiRoot}/freezers/${this.freezerId}/aliments/${alimentToDelete.id}`, this.options);
  }
}
