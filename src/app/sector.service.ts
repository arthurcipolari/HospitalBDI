import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SectorModel } from './sector/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) { }

  listarSetores(Cod_Hospital): Observable<any> {
    return this.http.get('http://localhost:3333/hospital/' + Cod_Hospital + '/sector');
  }

  adicionarSetor(setor: SectorModel, Cod_Hospital): Observable<any> {
    return this.http.post('http://localhost:3333/hospital/' + Cod_Hospital + '/sector', setor);
  }

  deletarSetor(setor): Observable<any> {
    return this.http.delete('http://localhost:3333/hospital/' + setor.Cod_Hospital + '/sector/' + setor.Cod_Setor);
  }
}
