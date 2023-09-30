import 'zone.js/dist/zone';
import { Component, inject, Injectable, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

interface City {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class CityStore {
  cities$ = of<City[]>([{ name: 'London' }, { name: 'Moscow' }]);
}

@Component({
  selector: 'my-custom',
  standalone: true,
  imports: [NgFor],
  template: `
    <div *ngFor="let item of cities">
      {{ item.name }}
    </div>
  `,
})
export class Custom {
  @Input({ required: true }) cities!: City[];
}

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [Custom],
  template: `
    <my-custom [cities]="cities()"></my-custom>
  `,
})
export class App {
  private readonly store = inject(CityStore);

  readonly cities = toSignal(this.store.cities$, {
    initialValue: [] as City[],
  });
}

bootstrapApplication(App);
