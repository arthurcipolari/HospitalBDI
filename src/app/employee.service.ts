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

  adicionarFuncionario(funcionario: EmployeeModel): Observable<any> {
    return this.http.post('http://localhost:3333/employee', funcionario);
  }

  editarFuncionario(Cod_Funcionario): Observable<any> {
    return this.http.get('http://localhost:3333/employee/' + Cod_Funcionario);
  }

  atualizarFuncionario(funcionario): Observable<any> {
    return this.http.patch('http://localhost:3333/employee/' + funcionario.Cod_Funcionario, funcionario);
  }

  deletarFuncionario(Cod_Funcionario): Observable<any> {
    return this.http.delete('http://localhost:3333/employee/' + Cod_Funcionario);
  }

  listarFuncionarios(): Observable<any> {
    return this.http.get('http://localhost:3333/employee');
  }

  adicionarMedico(medico: DoctorModel, funcionario): Observable<any> {
    return this.http.post('http://localhost:3333/employee/' + funcionario.insertId + '/doctor', medico);
  }

  fixMedico(medico: DoctorModel, funcionario): Observable<any> {
    return this.http.post('http://localhost:3333/employee/' + funcionario.Cod_Funcionario + '/doctor', medico);
  }

  editarMedico(Cod_Funcionario): Observable<any> {
    return this.http.get('http://localhost:3333/doctor/' + Cod_Funcionario);
  }

  atualizarMedico(medico): Observable<any> {
    return this.http.patch('http://localhost:3333/doctor/' + medico.Cod_Funcionario, medico);
  }

  listarSetores(Cod_Hospital): Observable<any> {
    return this.http.get('http://localhost:3333/hospital/' + Cod_Hospital + '/sector');
  }

  listarFuncionarioHospital(Cod_Hospital): Observable<any> {
  return this.http.get('http://localhost:3333/hospital/' + Cod_Hospital + '/employee');
  }

}
