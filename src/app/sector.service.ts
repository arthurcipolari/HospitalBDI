import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) { }

  listarHospitais(): Observable<any>{
    return this.http.get('http://localhost:3333/hospital/');
  }

  listarSetoresPorHospital(): Observable<any>{
    const Cod_Hospital = "1";
    return this.http.get('http://localhost:3333/hospital/'+Cod_Hospital +'/sector');
  }
}
