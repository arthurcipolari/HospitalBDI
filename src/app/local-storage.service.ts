import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HospitalizationModel } from './hospitalization/hospitalization.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private http: HttpClient) { }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  listarHospitais(): Observable<any> {
    return this.http.get('http://localhost:3333/hospital');
  }

  getHospital(Cod_Hospital): Observable<any> {
    return this.http.get('http://localhost:3333/hospital/' + Cod_Hospital);
  }

  getPatients(): Observable<any> {
    return this.http.get('http://localhost:3333/patients')
  }

  getDoctors(Cod_Hospital): Observable<any> {
    return this.http.get('http://localhost:3333/hospital/' + Cod_Hospital + '/doctors')
  }

  getRooms(Cod_Hospital): Observable<any> {
    return this.http.get('http://localhost:3333/hospital/' + Cod_Hospital + '/rooms')
  }

  getHospitalizations(Cod_Hospital): Observable<any> {
    return this.http.get('http://localhost:3333/hospital/' + Cod_Hospital + '/hospitalizations')
  }

  registrarAlta(Cod_Paciente, Data_Alta): Observable<any> {
    return this.http.patch('http://localhost:3333/hospitalization/' + Cod_Paciente, Data_Alta)
  }

  registrarInternacao(internacao: HospitalizationModel): Observable<any> {
    return this.http.post('http://localhost:3333/hospitalization/', internacao)
  }

}
