import { isDevMode } from '@angular/core';

export const environment = {
  apiUrl: isDevMode() ? "http://192.168.1.9:8000/api/" : "https://firplak-back-14e4f036e60b.herokuapp.com/api/",
}