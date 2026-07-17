import { Component, computed, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { Opportunity, RegistrationPackage } from '../../../core/models/opportunity.model';
import { Participant } from '../../../core/models/registration.model';
import { OpportunityService } from '../../../core/services/opportunity.service';
import { RegistrationService } from '../../../core/services/registration.service';
import { SAMPLE_USER_ID } from '../../../core/constants/api.constants';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state';
import { LoadingStateComponent } from '../../../shared/components/loading-state/loading-state';
import { PackageSelectionComponent } from '../package-selection/package-selection';
import { ParticipantDetailsComponent } from '../participant-details/participant-details';
import { RegistrationReviewComponent } from '../registration-review/registration-review';
import { RegistrationSuccessComponent } from '../registration-success/registration-success';

@Component({selector:'app-registration-wizard',imports:[RouterLink,LoadingStateComponent,EmptyStateComponent,PackageSelectionComponent,ParticipantDetailsComponent,RegistrationReviewComponent,RegistrationSuccessComponent],templateUrl:'./registration-wizard.html',styleUrl:'./registration-wizard.scss'})
export class RegistrationWizardComponent {
  private readonly route=inject(ActivatedRoute); private readonly opportunities=inject(OpportunityService); private readonly registrations=inject(RegistrationService); private readonly fb=inject(FormBuilder);
  readonly opportunity=signal<Opportunity|null>(null); readonly loading=signal(true); readonly error=signal(false); readonly step=signal(1); readonly selectedPackageId=signal(''); readonly quantity=signal(1); readonly submitting=signal(false); readonly submitError=signal(false); readonly reference=signal(''); readonly completedTotal=signal(0);
  readonly participantForms=new FormArray<FormGroup>([]); readonly selectedPackage=computed(()=>this.opportunity()?.packages.find(pkg=>pkg.id===this.selectedPackageId())??null); readonly total=computed(()=>(this.selectedPackage()?.price??0)*this.quantity());
  constructor(){this.route.paramMap.pipe(switchMap(params=>this.opportunities.getOpportunity(params.get('id')??''))).subscribe({next:item=>{this.opportunity.set(item);this.loading.set(false);if(item.packages.length){this.selectedPackageId.set(item.packages[0].id);this.syncParticipants();}},error:()=>{this.error.set(true);this.loading.set(false);}});}
  updateSelection(event:{packageId:string;quantity:number}):void{const pkg=this.opportunity()?.packages.find(item=>item.id===event.packageId);if(!pkg)return;this.selectedPackageId.set(event.packageId);this.quantity.set(Math.max(1,Math.min(event.quantity,pkg.available)));this.syncParticipants();}
  next():void{if(this.step()===1&&this.selectedPackage()){this.step.set(2);window.scrollTo({top:0,behavior:'smooth'});return;}if(this.step()===2){if(this.participantForms.invalid){this.participantForms.markAllAsTouched();return;}this.step.set(3);window.scrollTo({top:0,behavior:'smooth'});}}
  back():void{this.step.update(value=>Math.max(1,value-1));window.scrollTo({top:0,behavior:'smooth'});}
  submit():void{const item=this.opportunity(),pkg=this.selectedPackage();if(!item||!pkg||this.submitting()||this.participantForms.invalid)return;this.submitting.set(true);this.submitError.set(false);const reference=`CC-${new Date().getFullYear()}-${crypto.getRandomValues(new Uint32Array(1))[0].toString().slice(0,6).padStart(6,'0')}`;this.registrations.create({userId:SAMPLE_USER_ID,opportunityId:item.id,opportunityTitle:item.title,opportunityDate:item.startDate,selectedPackage:{packageId:pkg.id,packageName:pkg.name,unitPrice:pkg.price,quantity:this.quantity()},participants:this.participantForms.getRawValue() as Participant[],total:this.total(),referenceNumber:reference,status:'Upcoming',createdAt:new Date().toISOString()}).pipe(finalize(()=>this.submitting.set(false))).subscribe({next:()=>{this.completedTotal.set(this.total());this.reference.set(reference);this.step.set(4);},error:()=>this.submitError.set(true)});}
  private syncParticipants():void{while(this.participantForms.length<this.quantity())this.participantForms.push(this.createParticipant());while(this.participantForms.length>this.quantity())this.participantForms.removeAt(this.participantForms.length-1);}
  private createParticipant():FormGroup{return this.fb.group({fullName:['',[Validators.required,Validators.minLength(2)]],email:['',[Validators.required,Validators.email]],phone:['',[Validators.required,Validators.pattern(/^[+\d][\d\s().-]{7,}$/)]],experienceLevel:['',Validators.required],profileUrl:['',Validators.pattern(/^https?:\/\/.+/)]});}
}
