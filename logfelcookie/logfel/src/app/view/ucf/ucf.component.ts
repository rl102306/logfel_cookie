import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { StepperOrientation } from '@angular/material/stepper';
import PSPDFKit from 'pspdfkit';
import { map, Observable } from 'rxjs';
import { AuthUserService } from 'src/app/auth/auth-user.service';
import { UploadFactService } from 'src/app/models/upload-fact.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ucf',
  templateUrl: './ucf.component.html',
  styleUrls: ['./ucf.component.css']
})
export class UcfComponent implements OnInit {

  public Bool_IsEditable = false;
  public SC_Primer_Paso: any;
  public SC_Segundo_Paso: any;
  public SC_Tercer_Paso:any;
  public SC_Cuarto_Paso:any;
  public File_Upload: File | null = null;
  public StepperOrientacion: Observable<StepperOrientation> | any;
  private token: any;
  public File_Name_Request: any;
  public File_Url_Preview: any;
  public Mostrar_Tam: boolean = false;
  public File_Url_Fact_Logo: any;
  public Str_Posicion_Combo: any;
  public Str_Id_User: any;
  public Str_Size_Logo: any;
  public Str_Url: any;

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand: any;
  

  constructor(private authUserService: AuthUserService, breakPointObserver: BreakpointObserver,
    private UploadFile:UploadFactService) { 
    this.StepperOrientacion = breakPointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));

   
  }

  ngOnInit(): void {
   
  }
  
  onLogout(){
    this.authUserService.logout();
  }

  Get_File_Input(event:any)
  {
    if(event.target.files.length > 0 ){
      this.File_Upload = event.target.files[0];
    }
  }

  MostrarTam(event: MatRadioChange ){
    this.Mostrar_Tam = true;
    this.Str_Posicion_Combo = event.value
  }

  GetTam(event:MatRadioChange){
    this.Str_Size_Logo = event.value
  }

  Upload_File(){
    if(this.File_Upload){
      this.token = localStorage.getItem('Token');
      const Form_Data = new FormData();
      Form_Data.append('file',this.File_Upload);
      Form_Data.append('Str_Id_Usuario',"1");
      this.UploadFile.Upload_File(Form_Data,this.token).subscribe({
        next: (res:any) =>{
          this.File_Name_Request = res.file;
          this.File_Url_Preview = `${environment.API_URL}${this.File_Name_Request}`;
          console.log('URL')
          console.log(this.File_Url_Preview)
          Swal.fire(
            { title: 'Felicidades!', text: 'Tu archivo ha sido cargado.', icon: 'success', confirmButtonText: 'Cerrar' }
            );
        },
          error:(err) => Swal.fire({ title: 'Oops...', text: '¡Algo salió mal!, por favor intenta de nuevo.', icon: 'error', confirmButtonText: 'Cerrar' } 
          )
        }
      )
    }
  }

  Get_Fact_Mod() {
    this.token = localStorage.getItem('Token');
    this.Str_Id_User = localStorage.getItem('User_Id');
    const Json_Fact_Param = {
      posicion : this.Str_Posicion_Combo,
      url : this.File_Name_Request,
      usuario: this.Str_Id_User,
      size: this.Str_Size_Logo
    }
        
    this.UploadFile.postfile(Json_Fact_Param,this.token).subscribe(
      (res) => {
        const response = res;
        this.File_Url_Fact_Logo = `${environment.API_URL}${res}`;
        console.log(this.File_Url_Fact_Logo)
        this.pdfViewerOnDemand.pdfSrc = this.File_Url_Fact_Logo
        this.pdfViewerOnDemand.refresh(); 
        Swal.fire(
          { title: 'Felicidades!', text: 'Tu factura ha sido personalizada.', icon: 'success', confirmButtonText: 'Cerrar' }
          );
      },
      (err) => {  
        Swal.fire({ title: 'Oops...', text: '¡Algo salió mal!, por favor intenta de nuevo.', icon: 'error', confirmButtonText: 'Cerrar' });
      } 
    );
  }
}
