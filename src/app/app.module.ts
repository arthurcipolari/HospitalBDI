import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EmployeeComponent } from './employee/employee.component';
import { SectorComponent } from './sector/sector.component';
import { HospitalizationComponent } from './hospitalization/hospitalization.component';

import { EmployeeService } from './employee.service';
import { LocalStorageService } from './local-storage.service';
import { SectorService } from './sector.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    EmployeeComponent,
    SectorComponent,
    HospitalizationComponent
  ],
  providers: [HttpClientModule, DatePipe, EmployeeService, LocalStorageService, SectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
