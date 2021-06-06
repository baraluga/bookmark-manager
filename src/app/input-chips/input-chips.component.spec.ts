import { ElementRef } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { skip, take, timeoutWith } from 'rxjs/operators';
import { InputChipsComponent } from './input-chips.component';

describe('InputChipsComponent', () => {
  let component: InputChipsComponent;

  beforeEach(() => {
    component = new InputChipsComponent();
    component.chipInput = mockElementRef();
  });
  it('should remove clicked chip from active chips', (done) => {
    component.activeChips.pipe(skip(3), take(1)).subscribe((chips) => {
      expect(chips[0]).toEqual('hi');
      done();
    });
    component.onAutoCompleteSelection(mockAutoSelectionEvent('hello'));
    component.onAutoCompleteSelection(mockAutoSelectionEvent('hi'));
    component.onRemoveChip('hello');
  });

  describe('On supposedly adding a chip...', () => {
    it('should do so if the current value of inputControl is valid', (done) => {
      component.activeChips.pipe(skip(1), take(1)).subscribe((chips) => {
        expect(chips[0]).toEqual('mama');
        done();
      });
      component.inputControl.setValue('mama');
      component.onAddChip();
    });

    it('should not do so if the current value of inputCtrl is invalid', (done) => {
      component.activeChips
        .pipe(skip(1), take(1), timeoutWith(1000, of('noEmission')))
        .subscribe((data) => {
          expect(data).toEqual('noEmission');
          done();
        });
      component.onAddChip();
    });
  });

  it('should provide the filtered chips for autoselection based on the active ones', (done) => {
    component.filteredOptions$.pipe(skip(2), take(1)).subscribe((options) => {
      expect(options.length).toEqual(1);
      expect(options[0]).toEqual('mom');
      done();
    });
    component.options = ['mom', 'dad'];
    component.onAutoCompleteSelection(mockAutoSelectionEvent('dad'));
  });
});

const mockAutoSelectionEvent = (viewValue: string) =>
  ({ option: { viewValue } } as MatAutocompleteSelectedEvent);
const mockElementRef = () =>
  ({ nativeElement: { value: '' } } as ElementRef<HTMLInputElement>);
