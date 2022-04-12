import { MediaMatcher } from '@angular/cdk/layout';
import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/auth/auth-user.service';

@Component({
  selector: 'app-heaader',
  templateUrl: './heaader.component.html',
  styleUrls: ['./heaader.component.css']
})
export class HeaaderComponent implements OnInit {

  isLogged = false;
  ngOnInit(): void {

    this.authSVC.isLoggedIn().subscribe((res) => this.isLogged = res)
  }

  mobileQuery: MediaQueryList | any;
  toggleActive = false;
 


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authSVC: AuthUserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(){
    this.authSVC.logout();
  }
}
