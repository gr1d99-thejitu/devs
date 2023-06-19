import { Component, OnInit } from '@angular/core';
import { DeveloperService } from '../services/developer.service';
import { DeveloperResponse } from '../types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  developers: [DeveloperResponse[], number] = [[], 0];
  constructor(private readonly developerService: DeveloperService) {}

  ngOnInit(): void {
    this.fetchDevelopers();
  }

  fetchDevelopers(): void {
    this.developerService.fetchDevelopers().subscribe((developers) => {
      console.debug(developers[0]);
      this.developers = developers;
    });
  }
}
