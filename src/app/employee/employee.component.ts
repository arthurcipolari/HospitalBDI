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

  public funcionario: EmployeeModel = new EmployeeModel;
  editFuncionario: EmployeeModel = new EmployeeModel;
  medico: DoctorModel = new DoctorModel;
  setores: any;
  funcionarios: Array<any> = new Array();
  data: string;
  public setorMedico: any;

  AddFuncionario = false;
  EditandoFuncionario = false;

  constructor(private employeeService: EmployeeService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.listarSetores();
    this.listarFuncionarios();
  }

  adicionarFuncionario() {
    if (this.funcionario.Cod_Setor == this.setorMedico.Cod_Setor) {
      console.log('medico', this.funcionario, this.setorMedico);
      this.funcionario.Medico = 1;
    } else {
      console.log('not medico', this.funcionario, this.setorMedico);
      this.funcionario.Medico = 0;
    }
    this.employeeService.adicionarFuncionario(this.funcionario).subscribe(funcionario => {
      if (this.funcionario.Medico === 1) {
        this.employeeService.adicionarMedico(this.medico, funcionario).subscribe(medico => {
          this.medico = new DoctorModel();
        }, err => {
          console.log('Erro ao cadastrar médico', err);
          alert('Erro ao cadastrar médico');
        })
      }
      this.funcionario = new EmployeeModel();
      this.listarFuncionarios();
      this.AddFuncionario = false;
    }, err => {
      console.log('Erro ao cadastrar funcionário', err);
      alert('Erro ao cadastrar funcionário');
    })

  }

  listarSetores() {
    const codHosp = '1';
    this.employeeService.listarSetores(codHosp).subscribe(setores => {
      console.log(setores);
      this.setores = setores;
      function getSetorByFind(nome) {
        return setores.find(x => x.Nome_Setor === nome);
      }
      this.setorMedico = getSetorByFind('Médico');
      console.log(this.setorMedico);
    }, err => {
      console.log('Erro ao listar setores', err);
    })
  }

  listarFuncionarios() {
    const codHosp = '1';
    this.employeeService.listarFuncionarioHospital(codHosp).subscribe(funcionarios => {
      this.funcionarios = funcionarios;
      console.log(this.funcionarios);
    }, err => {
      console.log('Erro ao listar funcionarios', err);
    })
  }

  editarFuncionario(Cod_Funcionario) {
    this.EditandoFuncionario = true;
    this.employeeService.editarFuncionario(Cod_Funcionario).subscribe(funcionario => {
      this.funcionario = funcionario[0];
      this.data = this.datepipe.transform (new Date(this.funcionario.Data_Admissao), 'yyyy-MM-dd');
      console.log('funcionario', this.funcionario);
      if (this.funcionario.Medico) {
        this.medico.CRM = funcionario[0].CRM;
        this.medico.Especialidade = funcionario[0].Especialidade;
        this.medico.Cod_Funcionario = funcionario[0].Cod_Funcionario;
        }
    // tslint:disable-next-line: no-unused-expression
    }), err => {
      console.log('Erro ao editar usuário', err);
    }
  }

  atualizarFuncionario() {
    if (this.funcionario.Cod_Setor === this.setorMedico.Cod_Setor) {
      this.funcionario.Medico = 1;
    } else {
      this.funcionario.Medico = 0;
    }
    this.employeeService.atualizarFuncionario(this.funcionario).subscribe( res => {
      console.log('funcionario', this.funcionario);
      if (this.funcionario.Medico === 1) {
        console.log('patch medico', this.medico);
        this.employeeService.atualizarMedico(this.medico).subscribe(medico => {
          this.medico = new DoctorModel();
          this.listarFuncionarios();
        }, err => {
          console.log('Erro ao atualizar médico', err);
          alert('Erro ao atualizar médico!');
        })
      }
      this.EditandoFuncionario = !this.EditandoFuncionario;
      this.funcionario = new EmployeeModel();
      this.listarFuncionarios();
    // tslint:disable-next-line: no-unused-expression
    }), err => {
      console.log('Erro ao atualizar funcionário', err);
      alert('Erro ao atualizar funcionário!');
    }
  }

  cancelarEdicao() {
    this.EditandoFuncionario = false;
    this.funcionario = new EmployeeModel();
    this.medico = new DoctorModel();
  }

  removerFuncionario(Cod_Funcionario) {
    this.employeeService.deletarFuncionario(Cod_Funcionario).subscribe( res => {
      this.listarFuncionarios();
    })
    alert('Usuário removido!');
  }

  toggleFuncionario() {
    this.funcionario = new EmployeeModel();
    this.AddFuncionario = !this.AddFuncionario;
  }

}
