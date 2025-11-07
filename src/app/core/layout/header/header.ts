import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbarRow} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarRow
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
