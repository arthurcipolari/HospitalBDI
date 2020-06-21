import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from './employee/employee.model';
import { DoctorModel } from './employee/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  adicionarFuncionario(funcionario: EmployeeModel): Observable<any>{
    return this.http.post("http://localhost:3333/employee", funcionario);
  }

  adicionarMedico(medico: DoctorModel, funcionario): Observable<any>{
    console.log("codigo funcionario", funcionario.insertId);
    return this.http.post('http://localhost:3333/employee/'+ funcionario.insertId + '/doctor', medico);
  }

  editarFuncionario(Cod_Funcionario): Observable<any>{
    return this.http.get("http://localhost:3333/employee/" + Cod_Funcionario);
  }

  editarMedico(Cod_Funcionario): Observable<any>{
    return this.http.get("http://localhost:3333/doctor/" + Cod_Funcionario);
  }

  listarFuncionarios(): Observable<any>{
    return this.http.get("http://localhost:3333/employee");
  }

  listarSetores(): Observable<any>{
    const Cod_Hospital = "1";
    return this.http.get('http://localhost:3333/hospital/'+Cod_Hospital +'/sector');
  }
}
