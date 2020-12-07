import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "../shared/input/input.component";
import { RadioComponent } from "../shared/radio/radio.component";
import { RatingComponent } from "../shared/rating/rating.component";

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent, 
              CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule{

}