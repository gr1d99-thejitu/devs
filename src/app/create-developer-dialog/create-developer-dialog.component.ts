import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProgrammingLanguage } from '../types';
import { ProgrammingLanguageService } from '../services/programming-language.service';
import { map, Observable, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-developer-dialog',
  templateUrl: './create-developer-dialog.component.html',
  styleUrls: ['./create-developer-dialog.component.scss'],
})
export class CreateDeveloperDialogComponent implements OnInit {
  separatorKeyCodes: number[] = [ENTER, COMMA];
  skills: [ProgrammingLanguage[], number] = [[], 0];
  selectedSkills: string[] = [];
  filteredSkills = new Observable<string[]>();

  // @ts-ignore
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);

  constructor(
    private fb: FormBuilder,
    private programmingLanguageService: ProgrammingLanguageService
  ) {
    this.filteredSkills =
      this.developerForm.controls.programmingLanguages.valueChanges.pipe(
        startWith(null),
        map((skill: string | null) =>
          skill
            ? this._filter(skill)
            : this.skills[0].map(({ name }) => name).slice()
        )
      );
  }

  ngOnInit() {
    console.log('init');
    this.fetchProgrammingLanguages();
  }

  developerForm = this.fb.group({
    user: ['', Validators.required],
    title: ['', Validators.required],
    programmingLanguages: [''],
    isApproved: [''],
  });

  onSubmit() {}

  fetchProgrammingLanguages() {
    this.programmingLanguageService
      .fetchProgrammingLanguages()
      .subscribe((languages) => {
        this.skills = languages;
      });
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    const vv = this.skills[0].find((v) => v.name === value);

    if (value && vv) {
      this.selectedSkills.push(vv.name);
    }

    event.chipInput?.clear();

    this.developerForm.controls.programmingLanguages.setValue(null);
  }

  remove(skill: string) {
    const index = this.selectedSkills.indexOf(skill);

    if (index > 0) {
      this.selectedSkills.splice(index, 1);

      this.announcer.announce('Removed');
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const v = this.skills[0].find(
      ({ name }) => name === event.option.viewValue
    );

    if (v) {
      this.selectedSkills.push(v.name);
      this.skillInput.nativeElement.value = '';
      this.developerForm.controls.programmingLanguages.setValue(null);
    }
  }

  private _filter(skill: string): string[] {
    return this.skills[0]
      .filter((s) => s.name.toLowerCase().includes(skill))
      .map(({ name }) => name);
  }
}
