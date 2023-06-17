import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  MediaMatcher,
  BreakpointObserver,
  BreakpointState,
} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy, OnInit {
  public isAuthenticated = false;
  mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly route: Router,
    private readonly authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);

    // detect screen size changes
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          // hide stuff
          console.log('big');
        } else {
          // show stuff
          console.log('small');
        }
      });

    this.authService.checkAuthentication().subscribe(() => {
      this.authService.isAuthenticated.subscribe((value) => {
        this.isAuthenticated = value;
      });
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout(): void {
    this.authService.logout();
  }

  shouldRun = /(^|.)(localhost:4200)$/.test(window.location.host);
}
