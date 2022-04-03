import { Component, OnInit } from '@angular/core';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { AuthUserService } from 'src/app/auth/auth-user.service';

@Component({
  selector: 'app-ucf',
  templateUrl: './ucf.component.html',
  styleUrls: ['./ucf.component.css']
})
export class UcfComponent implements OnInit {
  public Bool_IsEditable = false;
  first_form_group: any;

  secondFormGroup: any;

  thirdFormGroup:any;

  fourthFormGroup:any;

  fiveFormGroup:any;

  sixFormGroup:any;
  

  constructor(private authUserService: AuthUserService) { }

  ngOnInit(): void {
  }
  
  onLogout(){
    this.authUserService.logout();
  }
}
