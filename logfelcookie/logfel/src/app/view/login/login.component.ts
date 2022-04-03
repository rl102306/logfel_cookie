import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/auth/auth-user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Form_Login: any;
  public hide = true;
  private token: any;
  private token_error: any;
 
  constructor(private Form_Builder_Login: FormBuilder, private authUserService: AuthUserService,
    private router: Router) { }

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
    this.authUserService.token()

    
    //this.token_error = localStorage.getItem('Token_Error');
    /*if (this.token_error == '0') {
      Swal.fire(
        { title: 'Error!', text: 'Ocurrió un error, favor contacte al administrador. Codigo de error T019K.', icon: 'error', confirmButtonText: 'Cerrar' }
      );
    }
    else {*/
      console.log("Aca viene el token Null creo")

      this.token = localStorage.getItem('Token');
      
      console.log(this.token)

      this.authUserService.login(this.token, UserData).subscribe(
        (res) => {
          if (res) {
            this.router.navigate(["ucf"]);
            Swal.fire(
              { title: 'Bienvenido!', text: 'Gracias por volver', icon: 'success', confirmButtonText: 'Cerrar' }
            );
            //localStorage.removeItem('Token');
          }
        });
    }
 // }
}