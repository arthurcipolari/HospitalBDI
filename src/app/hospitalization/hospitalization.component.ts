import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/employee.service';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from 'app/local-storage.service';
import { SectorService } from 'app/sector.service';
import { HospitalizationModel } from './hospitalization.model';

declare var $: any;

@Component({
  selector: 'app-hospitalization',
  templateUrl: './hospitalization.component.html',
  styleUrls: ['./hospitalization.component.css']
})
export class HospitalizationComponent implements OnInit {


  nomeHospital: any;
  internacoes: any;
  medicos: any;
  pacientes: any;
  quartos: any;
  internacao = new HospitalizationModel;
  regInternacao = false;

  constructor(private localStorage: LocalStorageService, private sectorService: SectorService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getHospitalName();
    this.listarPacientes();
    this.listarMedicos();
    this.listarQuartos();
    this.listarInternacoes();
  }

  getHospitalName() {
    const codHosp = this.localStorage.get('selectedHospital');
    this.localStorage.getHospital(codHosp).subscribe(hospital => {
      this.nomeHospital = hospital[0].Nome;
    })
  }

  listarPacientes() {
    this.localStorage.getPatients().subscribe(pacientes => {
      this.pacientes = pacientes;
    })
  }

  listarMedicos() {
    const Cod_Hospital = this.localStorage.get('selectedHospital');
    this.localStorage.getDoctors(Cod_Hospital).subscribe(medicos => {
      this.medicos = medicos;
    })
  }

  listarQuartos() {
    const Cod_Hospital = this.localStorage.get('selectedHospital');
    this.localStorage.getRooms(Cod_Hospital).subscribe(quartos => {
      this.quartos = quartos;
    })
  }

  registrarAlta(Cod_Internacao) {
    const Data_Alta = this.datepipe.transform (new Date(), 'yyyy-MM-dd');
    this.localStorage.registrarAlta(Cod_Internacao, Data_Alta).subscribe(x => {
    this.reload();
    }, err => {
      console.log('Erro ao registrar alta', err);
      this.showDangerNotification('Erro ao registrar alta!');
    })
  }

  registrarInternacao(internacao) {
    if (internacao.Cod_Paciente && internacao.Cod_Medico && internacao.Cod_Quarto) {
    this.localStorage.registrarInternacao(internacao).subscribe(internacao => {
      this.regInternacao = false;
      this.reload();
      this.showSuccessNotification('Internação adicionada com sucesso!');
    }, err => {
      console.log('Erro ao registrar internação', err);
      this.showDangerNotification('Erro ao registrar internação');
    })
  } else {
    this.showDangerNotification('Preencha todos os campos!');
  }

  }

  listarInternacoes() {
    const Cod_Hospital = this.localStorage.get('selectedHospital');
    this.localStorage.getHospitalizations(Cod_Hospital).subscribe(internacoes => {
      this.internacoes = internacoes;
    })
  }

  reload() {
    this.internacao = new HospitalizationModel;
    this.listarPacientes();
    this.listarMedicos();
    this.listarQuartos();
    this.listarInternacoes();
  }

  toggleInternacao() {
    this.internacao = new HospitalizationModel;
    this.regInternacao = !this.regInternacao;
  }


  showDangerNotification(dangerMsg) {

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

showSuccessNotification(successMsg) {

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
