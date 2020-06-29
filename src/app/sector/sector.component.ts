import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/employee.service';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from 'app/local-storage.service';
import { SectorService } from 'app/sector.service';
import { SectorModel } from './sector.model';

declare var $: any;

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {


  setor = new SectorModel();
  setores = new Array();
  nomeHospital: any;

  constructor(private localStorage: LocalStorageService, private sectorService: SectorService) { }

  ngOnInit(): void {
    this.getHospitalName();
    this.listarSetores();

  }

  getHospitalName() {
    const codHosp = this.localStorage.get('selectedHospital');
    this.localStorage.getHospital(codHosp).subscribe(hospital => {
      this.nomeHospital = hospital[0].Nome;
    })
  }

  adicionarSetor() {
    const codHosp = this.localStorage.get('selectedHospital');
    this.sectorService.adicionarSetor(this.setor, codHosp).subscribe(setor => {
      this.setor = new SectorModel();
      this.listarSetores();
      this.showSuccessNotification('Setor adicionado com sucesso!');
    }, err => {
      console.log('Erro ao cadastrar funcionário', err);
      this.showDangerNotification('Erro ao cadastrar funcionário');
    })

  }

  listarSetores() {
    const codHosp = this.localStorage.get('selectedHospital');
    this.sectorService.listarSetores(codHosp).subscribe(setores => {
      this.setores = setores;
      if (!this.setores.length) {
        const empty = {Cod_Setor: '0', Nome_Setor: 'Não existem setores cadastrados', Cod_Hospital: codHosp};
        this.setores.push(empty);
      }
    }, err => {
      console.log('Erro ao listar setores', err);
      this.showDangerNotification('Erro ao listar setores');
    })

  }

  removerSetor(setor) {
    this.sectorService.deletarSetor(setor).subscribe( res => {
      this.listarSetores();
      if (res.errno == 1451) {
        console.log('Erro ao remover setor!', res);
        this.showDangerNotification('Erro ao remover setor!');
      } else {
        this.showDangerNotification('Setor removido!');
      }
    }, err => {
      console.log('Erro ao remover setor!', err);
      this.showDangerNotification('Erro ao remover setor!');
    })
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
