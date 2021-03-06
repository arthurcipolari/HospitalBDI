import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { EmployeeComponent } from '../../employee/employee.component';
import { SectorComponent } from '../../sector/sector.component';
import { HospitalizationComponent } from '../../hospitalization/hospitalization.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'sector',           component: SectorComponent },
    { path: 'employee',           component: EmployeeComponent },
    { path: 'hospitalization',          component: HospitalizationComponent }
];
