import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { OrderComponent } from "./order/order.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', loadChildren: './modules/about.module#AboutModule'},
    { path: 'restaurants', component: RestaurantsComponent },
    {
        path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            { path: "", redirectTo: "menu", pathMatch: "full" },
            { path: "menu", component: MenuComponent },
            { path: "reviews", component: ReviewsComponent }
        ]
    },
    { path: 'order', loadChildren: './modules/order.module#OrderModule'},
    { path: 'order-summary', component: OrderSummaryComponent }

]