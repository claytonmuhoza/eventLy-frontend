import {Component, input} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-http-error',
  imports: [
    MatCard
  ],
  templateUrl: './http-error.html',
  styleUrl: './http-error.css'
})
export class HttpError {
    error = input.required<HttpErrorResponse>();
}
