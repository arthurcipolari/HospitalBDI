import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from './employee.model';
import { DoctorModel } from './doctor.model';
import { EmployeeService } from 'app/employee.service';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from 'app/local-storage.service';
import { SectorService } from 'app/sector.service';

declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  public funcionario: EmployeeModel = new EmployeeModel;
  editFuncionario: EmployeeModel = new EmployeeModel;
  medico: DoctorModel = new DoctorModel;
  setores = new Array();
  funcionarios: Array<any> = new Array();
  data: string;
  public setorMedico: any;
  editandoNewMedico;
  nomeHospital: any;

  AddFuncionario = false;
  EditandoFuncionario = false;

  constructor(private employeeService: EmployeeService, public datepipe: DatePipe, private localStorage: LocalStorageService,
     private sectorService: SectorService) { }

  ngOnInit(): void {
    this.getHospitalName();
    this.listarSetores();
    this.listarFuncionarios();
  }

  getHospitalName() {
    const codHosp = this.localStorage.get('selectedHospital');
    this.localStorage.getHospital(codHosp).subscribe(hospital => {
      this.nomeHospital = hospital[0].Nome;
    })
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
          this.listarFuncionarios();
        }, err => {
          console.log('Erro ao cadastrar médico', err);
          this.showDangerNotification('Erro ao cadastrar médico');
        })
      }
      this.funcionario = new EmployeeModel();
      this.listarFuncionarios();
      this.AddFuncionario = false;
      this.showSuccessNotification('Funcionário adicionado com sucesso!');
    }, err => {
      console.log('Erro ao cadastrar funcionário', err);
      this.showDangerNotification('Erro ao cadastrar funcionário');
    })

  }

  listarSetores() {
    console.log('inicio lista setores');
    const codHosp = this.localStorage.get('selectedHospital');
    this.sectorService.listarSetores(codHosp).subscribe(setores => {
      console.log(setores);
      this.setores = setores;
      function getSetorByFind(nome) {
        return setores.find(x => x.Nome_Setor === nome);
      }
      this.setorMedico = getSetorByFind('Médico');
      if (this.setorMedico == undefined) {
        console.log('fix setor', this.setorMedico);
        this.setorMedico = { Cod_Setor: '-1', Nome_Setor: 'Não existem setores médicos cadastrados'};
        console.log('fixed', this.setorMedico);
      }
      if (!this.setores.length) {
        const empty = {Cod_Setor: '0', Nome_Setor: 'Não existem setores cadastrados', Cod_Hospital: codHosp};
        this.setores.push(empty);
        this.setorMedico.Cod_Setor = 0;
      }
    }, err => {
      console.log('Erro ao listar setores', err);
      this.showDangerNotification('Erro ao listar setores');
    })

  }

  listarFuncionarios() {
    const codHosp = this.localStorage.get('selectedHospital');
    this.employeeService.listarFuncionarioHospital(codHosp).subscribe(funcionarios => {
      this.funcionarios = funcionarios;
      console.log(this.funcionarios);
    }, err => {
      console.log('Erro ao listar funcionarios', err);
      this.showDangerNotification('Erro ao listar funcionarios');
    })
  }

  editarFuncionario(Cod_Funcionario) {
    this.EditandoFuncionario = true;
    this.employeeService.editarFuncionario(Cod_Funcionario).subscribe(funcionario => {
      this.funcionario = funcionario[0];
      this.data = this.datepipe.transform (new Date(this.funcionario.Data_Admissao), 'yyyy-MM-dd');
      console.log('funcionario EDIT', this.funcionario);
      this.editandoNewMedico = 1;
      if (this.funcionario.Medico) {
        this.editandoNewMedico = 0;
        this.medico.CRM = funcionario[0].CRM;
        this.medico.Especialidade = funcionario[0].Especialidade;
        this.medico.Cod_Funcionario = funcionario[0].Cod_Funcionario;
        }
    // tslint:disable-next-line: no-unused-expression
    }), err => {
      console.log('Erro ao editar funcionário', err);
      this.showDangerNotification('Erro ao editar funcionário');
    }
  }

  atualizarFuncionario() {
    console.log(this.setorMedico.Cod_Setor, this.editandoNewMedico);
    if (this.funcionario.Cod_Setor == this.setorMedico.Cod_Setor) {
      this.funcionario.Medico = 1;
      if (this.editandoNewMedico) {
        console.log('New médico', this.medico, this. funcionario);
        this.employeeService.fixMedico(this.medico, this.funcionario).subscribe(medico => {
        }, err => {
          console.log('Erro ao cadastrar médico', err);
          this.showDangerNotification('Erro ao cadastrar médico');
        })
      }
    } else {
      this.funcionario.Medico = 0;
    }
    console.log('AAAAAA', this.funcionario);
    this.employeeService.atualizarFuncionario(this.funcionario).subscribe( res => {
      console.log('AAAAAAfuncionario', this.funcionario);
      if (this.funcionario.Medico === 1) {
        console.log('patch medico', this.medico);
        this.employeeService.atualizarMedico(this.medico).subscribe(medico => {
          this.medico = new DoctorModel();
          this.listarFuncionarios();
        }, err => {
          console.log('Erro ao atualizar médico', err);
          this.showDangerNotification('Erro ao atualizar médico!');
        })
      }
      this.EditandoFuncionario = !this.EditandoFuncionario;
      this.funcionario = new EmployeeModel();
      this.listarFuncionarios();
      this.showSuccessNotification('Funcionário atualizado com sucesso!');
    // tslint:disable-next-line: no-unused-expression
    }), err => {
      console.log('Erro ao atualizar funcionário', err);
      this.showDangerNotification('Erro ao atualizar funcionário!');
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
    this.showDangerNotification('Funcionário removido!');
  }

  toggleFuncionario() {
    this.funcionario = new EmployeeModel();
    this.AddFuncionario = !this.AddFuncionario;
  }

  showDangerNotification(dangerMsg){

    $.notify({
        icon: 'nc-simple-remove',
        message: dangerMsg
    }, {
        type: 'danger',
        timer: 1000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
}

showSuccessNotification(successMsg){

  $.notify({
      icon: 'nc-check-2',
      message: successMsg
  }, {
      type: 'success',
      timer: 1000,
      placement: {
          from: 'top',
          align: 'right'
      }
  });
}

}
