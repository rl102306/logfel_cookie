import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/auth/auth-user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Form_Login: any;
  public hide = true;
  private token: any;
  private Str_User_Obj:any;
  private Str_User_Id:any;
  
  private isLoggedIn:Observable<boolean>|any;
 
  constructor(private Form_Builder_Login: FormBuilder, private authUserService: AuthUserService,
              private router: Router) { 
    this.isLoggedIn = authUserService.isLoggedIn();
  }

  ngOnInit(): void {

    this.Form_Login = this.Form_Builder_Login.group({
      user: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    })


  }
  onSubmitLogin() {
    
    const UserData = {
      username: this.Form_Login.get('user').value,
      password: this.Form_Login.get('pass').value
    }
   

    
    //this.token_error = localStorage.getItem('Token_Error');
    /*if (this.token_error == '0') {
      Swal.fire(
        { title: 'Error!', text: 'Ocurrió un error, favor contacte al administrador. Codigo de error T019K.', icon: 'error', confirmButtonText: 'Cerrar' }
      );
    }
    else {*/

    
      
      this.authUserService.login(UserData).subscribe(
        (res) => {
          if (res) {
            this.Str_User_Obj = res;
            const Str_User_Id = this.Str_User_Obj['userId'];
            this.authUserService.token()
            localStorage.setItem('User_Id', Str_User_Id);
            this.router.navigate(["ucf"]);
            Swal.fire(
              { title: 'Bienvenido!', text: 'Gracias por volver', icon: 'success', confirmButtonText: 'Cerrar' }
            );
          }
          },
          (err) => {  
            localStorage.removeItem('Token');
          }        
        );
        
    }
}