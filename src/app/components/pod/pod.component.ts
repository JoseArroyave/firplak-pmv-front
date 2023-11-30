import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pod',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pod.component.html',
  styleUrl: './pod.component.scss'
})
export class PodComponent {

  @Input() id_guia: string = '';
  public podForm!: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms = () => {
    this.podForm = this.formBuilder.group({
      guia: [null, [Validators.required]],
      documentos: [null, [Validators.required]],
    });
  }

  savePDO = () => {
    if (this.podForm.valid) {
      Swal.fire({ title: "", text: "POD guardado correctamente", icon: "success" });
      this.podForm.reset();
    } else {
      Swal.fire({ title: "", text: "Ingresa los datos", icon: "error" });
    }
  }

}
