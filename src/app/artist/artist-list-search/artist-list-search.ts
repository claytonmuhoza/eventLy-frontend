import {Component, output, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-artist-list-search',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './artist-list-search.html',
  styleUrl: './artist-list-search.css'
})
export class ArtistListSearch {
  protected readonly value = signal('');
  inputValue = output<string>()

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
    this.inputValue.emit(this.value());
  }
}
