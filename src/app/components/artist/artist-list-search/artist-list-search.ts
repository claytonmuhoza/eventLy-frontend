import {Component, effect, model, output, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounce} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {toObservable} from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-artist-list-search',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './artist-list-search.html',
  styleUrl: './artist-list-search.css'
})
export class ArtistListSearch {
  inputValue = model.required<string>()
  artistNameControl:FormControl= new FormControl<string>("");
  ngOnInit() {
    this.artistNameControl.setValue(this.inputValue())
    this.artistNameControl.valueChanges.pipe(debounceTime(200), distinctUntilChanged()).subscribe(
      q => this.inputValue.set(q || "")
    );
    this.inputValue.subscribe(value => this.artistNameControl.setValue(value));
  }

}
