import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Cod_Hospital: any;
  hospitais: any;
  selectedHospital;
  nomeHospital;

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit() {
    this.listarHospitais();
    }


    setHospital(Cod_Hospital) {
      this.localStorage.set('selectedHospital', Cod_Hospital );
    }

    getHospital() {
      const storage = this.localStorage.get('selectedHospital');
      if (storage) {
        this.selectedHospital = storage;
        this.nomeHospital = this.hospitais[storage - 1].Nome;
      } else {
        this.selectedHospital = null;
        this.nomeHospital = 'Nenhum hospital selecionado...';
      }
    }

    selecionarHospital() {
      this.setHospital(this.selectedHospital);
      this.nomeHospital = this.hospitais[this.selectedHospital - 1].Nome;
    }

    listarHospitais() {
      this.localStorage.listarHospitais().subscribe(hospitais => {
        this.hospitais = hospitais;
        this.getHospital();
      }, err => {
        console.log('Erro ao listar hospitais', err);
      })
    }
}
