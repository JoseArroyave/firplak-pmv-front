import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pod',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pod.component.html',
  styleUrl: './pod.component.scss'
})
export class PodComponent {

  @Input() id_guia: string = '';

}
