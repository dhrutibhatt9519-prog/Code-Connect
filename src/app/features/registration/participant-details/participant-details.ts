import { Component, input } from '@angular/core'; import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({selector:'app-participant-details',imports:[ReactiveFormsModule],templateUrl:'./participant-details.html',styleUrl:'./participant-details.scss'})
export class ParticipantDetailsComponent { readonly participants=input.required<FormArray<FormGroup>>(); control(index:number,name:string){return this.participants().at(index).get(name)!;} showError(index:number,name:string):boolean{const c=this.control(index,name);return c.invalid&&(c.touched||c.dirty);} }
