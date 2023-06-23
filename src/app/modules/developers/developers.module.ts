import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewDeveloperComponent } from './new-developer/new-developer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [NewDeveloperComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
})
export class DevelopersModule {}
