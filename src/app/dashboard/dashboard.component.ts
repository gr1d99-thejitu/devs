import { Component, OnInit } from '@angular/core';

import { DeveloperService } from '../services/developer.service';
import { DeveloperResponse } from '../types';
import { Dialog } from '@angular/cdk/dialog';
import { CreateDeveloperDialogComponent } from '../create-developer-dialog/create-developer-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  developers: [DeveloperResponse[], number] = [[], 0];
  constructor(
    private readonly developerService: DeveloperService,
    public dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.fetchDevelopers();
  }

  fetchDevelopers(): void {
    this.developerService.fetchDevelopers().subscribe((developers) => {
      this.developers = developers;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateDeveloperDialogComponent);
    console.log(dialogRef);
  }
}
