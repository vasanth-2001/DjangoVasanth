import { provideRouter,Routes } from '@angular/router';
import { MainDashboardComponent } from './layout/main-dashboard/main-dashboard.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { FeedbackComponent } from './layout/feedback/feedback.component';
import { ChennaiComponent } from './cities/chennai/chennai.component';
import { AhemdabadComponent } from './cities/ahemdabad/ahemdabad.component';
import { DelhiComponent } from './cities/delhi/delhi.component';
import { HoteldetailsComponent } from './hotels/hoteldetails/hoteldetails.component';
import { BookingComponent } from './layout/booking/booking.component';
import { authGuard } from './shared/guard/auth.guard';
import { CitiesComponent } from './layout/cities/cities.component';
import { MybookingsComponent } from './layout/mybookings/mybookings.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminRoomsComponent } from './admin/admin-rooms/admin-rooms.component';
import { RoomEditComponent } from './admin/admin-rooms/room-edit/room-edit.component';
import { RoomAddComponent } from './admin/admin-rooms/room-add/room-add.component';


export const routes: Routes = [
    {
        path:'',
        redirectTo:'',
        pathMatch:'full'
    },
    {
        path:'', component:MainDashboardComponent
    },
    {
        path:'login',component:LoginComponent
    },
    {
        path:'signup',component:SignupComponent
    },
    {
        path:'feedback',component:FeedbackComponent
    },
    {
        path:'chennai',component:ChennaiComponent
    },
    {
        path:'ahemdabad', component:AhemdabadComponent
    },
    {
        path:'delhi', component:DelhiComponent
    },
    {
        path:'hotel/:name', component:HoteldetailsComponent
    },
    {
        path:'book', component:BookingComponent, canActivate:[authGuard]
    },
    {
        path:'cities', component:CitiesComponent
    },
    {
        path:'mybookings', component:MybookingsComponent
    },
    { path: 'admin', component: AdminDashboardComponent },

    { path: 'admin/users', component: AdminUsersComponent },

    { path: 'admin/rooms', component: AdminRoomsComponent },
    { path: 'admin/rooms/edit/:id', component: RoomEditComponent },
    { path: 'admin/rooms/add', component: RoomAddComponent },


];

export const appConfig = {
    providrs:[provideRouter(routes)]
}