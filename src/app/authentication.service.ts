import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentHospitalSubject: BehaviorSubject<any>;
    public currentHospital: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentHospitalSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentHospital')));
        this.currentHospital = this.currentHospitalSubject.asObservable();
    }

    public get currentHospitalValue(): any{
        return this.currentHospitalSubject.value;
    }

    login(Cod_Hospital) {
                const hospital = window.btoa(Cod_Hospital);
                localStorage.setItem('currentHospital', JSON.stringify(hospital));
                this.currentHospitalSubject.next(hospital);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentHospital');
        this.currentHospitalSubject.next(null);
    }
}