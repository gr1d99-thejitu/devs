import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DeveloperService } from '../services/developer.service'
import { Developer } from './interfaces'

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {
  public developers: Developer[] = []
  constructor (private readonly developerService: DeveloperService) {
  }

  ngOnInit (): void {
    this.fetchDevelopers()
  }

  fetchDevelopers (): void {
    this.developerService.fetchDevelopers().subscribe(developers => {
      console.log(developers)
      this.developers = developers
    })
  }
}
