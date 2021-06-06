import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@ngneat/reactive-forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'input-chips',
  templateUrl: './input-chips.component.html',
  styleUrls: ['./input-chips.component.scss'],
})
export class InputChipsComponent {
  private optionsSubject = new BehaviorSubject<string[]>([]);

  private activeChipsSubject = new BehaviorSubject<string[]>([]);

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  readonly filteredOptions$: Observable<string[]>;

  readonly inputControl = new FormControl<string>('');

  @Input() label = '';

  @Input() set options(opts: string[]) {
    this.optionsSubject.next(opts);
  }

  @Output() activeChips = this.activeChipsSubject.asObservable();

  @ViewChild('chipInput') chipInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredOptions$ = this.getFilteredOptionsStream();
  }

  onRemoveChip(option: string): void {
    const current = this.activeChipsSubject.value;
    this.activeChipsSubject.next(current.filter((chip) => option !== chip));
  }

  onAddChip(): void {
    const input = this.inputControl.value;
    if (input) {
      this.addChip(input);
    }
  }

  onAutoCompleteSelection(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    this.addChip(value);
  }

  private addChip(chip: string): void {
    const current = this.activeChipsSubject.value;
    this.activeChipsSubject.next([...current, chip]);
    this.inputControl.setValue('');
    this.chipInput.nativeElement.value = '';
  }

  private getFilteredOptionsStream(): Observable<string[]> {
    return combineLatest([this.optionsSubject, this.activeChips]).pipe(
      map(([options, chips]) =>
        options.filter((option) => !chips.includes(option)),
      ),
    );
  }
}
