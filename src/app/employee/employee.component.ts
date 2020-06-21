import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from './employee.model';
import { DoctorModel } from './doctor.model';
import { EmployeeService } from 'app/employee.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, public datepipe: DatePipe) { }

  funcionario: EmployeeModel = new EmployeeModel;
  medico: DoctorModel = new DoctorModel;
  setores: any;
  funcionarios: Array<any> = new Array();
  data: string;

  AddFuncionario = false;
  EditandoFuncionario = false;
  Medico = false;

  ngOnInit(): void {
    this.listarSetores();
    this.listarFuncionarios();
  }

  adicionarFuncionario(){
    this.employeeService.adicionarFuncionario(this.funcionario).subscribe(funcionario => {
      if(this.funcionario.Medico){
        this.employeeService.adicionarMedico(this.medico, funcionario).subscribe(medico => {
          this.medico = new DoctorModel();
        }, err => {
          console.log('Erro ao cadastrar médico', err);
        })
      }
      this.funcionario = new EmployeeModel();
      this.listarFuncionarios();
      this.AddFuncionario = false;
      this.Medico = false;
    }, err => {
      console.log('Erro ao cadastrar funcionário', err);
    })

  }

  listarSetores() {
    this.employeeService.listarSetores().subscribe(setores =>{
      this.setores = setores;
      console.log(this.setores);
    }, err =>{
      console.log('Erro ao listar setores', err);
    })
  }

  listarFuncionarios() {
    this.employeeService.listarFuncionarios().subscribe(funcionarios =>{
      this.funcionarios = funcionarios;
    }, err => {
      console.log('Erro ao listar funcionarios', err);
    })
  }

  editarFuncionario(Cod_Funcionario){
    this.EditandoFuncionario = true;
    this.employeeService.editarFuncionario(Cod_Funcionario).subscribe(funcionario => {
      this.funcionario = funcionario[0];
      this.data = this.datepipe.transform (new Date(this.funcionario.Data_Admissao), 'yyyy-MM-dd');
      console.log("funcionario", this.funcionario);
      if(funcionario.Medico){
        this.employeeService.editarMedico(Cod_Funcionario).subscribe(medico => {
          this.medico = medico[0];
          console.log("medico", this.medico);
        })
      }
    }), err =>{
      console.log('Erro ao editar usuário', err);
    }
  }

  cancelarEdicao(){
    this.EditandoFuncionario = false;
    this.funcionario = new EmployeeModel();
    this.medico = new DoctorModel();
  }

  atualizarFuncionario(Cod_Funcionario){
    this.EditandoFuncionario = !this.EditandoFuncionario;
    this.funcionario = new EmployeeModel();
    this.medico = new DoctorModel();
    this.listarFuncionarios();
  }

  removerFuncionario(Cod_Funcionario){

    this.listarFuncionarios();
  }


  toggleFuncionario() {
    this.AddFuncionario = !this.AddFuncionario;
  }
  toggleMedico() {
    this.Medico = !this.Medico;
  }

}
