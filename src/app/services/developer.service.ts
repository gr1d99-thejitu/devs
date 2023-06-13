import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { developers } from '../data/developers.data'
import { Developer } from '../developer/interfaces'

@Injectable({
  providedIn: 'root'
})

export class DeveloperService {
  fetchDevelopers (): Observable<Developer[]> {
    return of(developers)
  }
}
