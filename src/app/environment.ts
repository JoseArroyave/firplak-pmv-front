import { isDevMode } from '@angular/core';

export const environment = {
  apiUrl: isDevMode() ? "http://192.168.1.9:8000/api/" : "",
}