import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core'
import { MediaMatcher, BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`)

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  )

  private readonly _mobileQueryListener: () => void

  constructor (
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly route: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => { changeDetectorRef.detectChanges() }
    this.mobileQuery.addListener(this._mobileQueryListener)

    // detect screen size changes
    this.breakpointObserver.observe([
      '(max-width: 768px)'
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        // hide stuff
        console.log('big')
      } else {
        // show stuff
        console.log('small')
      }
    })
  }

  ngOnDestroy (): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }

  async goToHome (): Promise<void> {
    await this.route.navigate([''])
  }

  shouldRun = /(^|.)(localhost:4200)$/.test(window.location.host)
}
