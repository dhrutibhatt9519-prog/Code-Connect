import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { SAMPLE_USER_ID } from '../../../core/constants/api.constants';
import { Registration, RegistrationStatus } from '../../../core/models/registration.model';
import { RegistrationService } from '../../../core/services/registration.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state';
import { LoadingStateComponent } from '../../../shared/components/loading-state/loading-state';

type Filter='All'|RegistrationStatus;
@Component({selector:'app-my-registrations',imports:[DatePipe,CurrencyPipe,LoadingStateComponent,EmptyStateComponent,ConfirmationDialogComponent],templateUrl:'./my-registrations.html',styleUrl:'./my-registrations.scss'})
export class MyRegistrationsComponent {
 private readonly service=inject(RegistrationService); readonly registrations=signal<Registration[]>([]); readonly loading=signal(true); readonly error=signal(false); readonly filter=signal<Filter>('All'); readonly cancelling=signal<Registration|null>(null); readonly cancellationBusy=signal(false); readonly successMessage=signal('');
 readonly filtered=computed(()=>this.registrations().filter(item=>this.filter()==='All'||item.status===this.filter())); readonly filters:Filter[]=['All','Upcoming','Completed','Cancelled'];
 constructor(){this.load();}
 load():void{this.loading.set(true);this.error.set(false);this.service.getForUser(SAMPLE_USER_ID).pipe(finalize(()=>this.loading.set(false))).subscribe({next:data=>this.registrations.set(data.sort((a,b)=>new Date(b.opportunityDate).getTime()-new Date(a.opportunityDate).getTime())),error:()=>this.error.set(true)});}
 confirmCancellation():void{const registration=this.cancelling();if(!registration?.id||this.cancellationBusy())return;this.cancellationBusy.set(true);this.service.updateStatus(registration.id,'Cancelled').pipe(finalize(()=>this.cancellationBusy.set(false))).subscribe({next:updated=>{this.registrations.update(items=>items.map(item=>item.id===updated.id?{...item,status:'Cancelled'}:item));this.cancelling.set(null);this.successMessage.set(`${registration.opportunityTitle} was cancelled.`);setTimeout(()=>this.successMessage.set(''),4000);},error:()=>{this.cancelling.set(null);this.error.set(true);}});}
}
