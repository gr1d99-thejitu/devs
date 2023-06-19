import { Component, OnInit } from '@angular/core';

import { DeveloperService } from '../services/developer.service';
import { DeveloperResponse } from '../types';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss'],
})
export class DeveloperComponent implements OnInit {
  public developers: [DeveloperResponse[], number] = [[], 0];
  constructor(private readonly developerService: DeveloperService) {}

  ngOnInit(): void {
    this.fetchDevelopers();
  }

  fetchDevelopers(): void {
    this.developerService.fetchDevelopers().subscribe((developers) => {
      return developers;
    });
  }
}
