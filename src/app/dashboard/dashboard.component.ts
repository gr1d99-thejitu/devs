import { Component, OnInit } from '@angular/core'
import { DeveloperService } from '../services/developer.service'
import { Developer } from '../developer/interfaces'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  developers: Developer[] = []
  constructor (
    private readonly developerService: DeveloperService
  ) {}

  ngOnInit (): void {
    this.fetchDevelopers()
  }

  fetchDevelopers (): void {
    this.developerService.fetchDevelopers().subscribe(developers => {
      this.developers = developers
    })
  }
}
