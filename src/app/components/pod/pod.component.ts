import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RequestHTTPService } from '../../services/requestHTTP-component.service';
import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public guiaActual: string = '';
  public route: Router;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private requestHTTPService: RequestHTTPService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.route = inject(Router);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => this.guiaActual = params['id']);
    this.initForms();
  }

  initForms = () => {
    this.podForm = this.formBuilder.group({
      documentos_archivo: [null, [Validators.required]],
      guia_archivo: [null, [Validators.required]],
      guia: [null, [Validators.required]],
    });
  }

  /* La función `savePOD` es un método definido en la clase `PodComponent`. Se llama cuando el usuario
  desea guardar el formulario de Prueba de entrega (POD). */
  savePOD = () => {
    this.podForm.get("guia")?.setValue(this.guiaActual);
    if (this.podForm.valid) {
      this.requestHTTPService.savePOD(this.podForm.value).subscribe((response: any) => {
        Swal.fire({ title: "", text: "POD guardado correctamente", icon: "success" });
        this.route.navigateByUrl('/Guias');
      })
    } else {
      Swal.fire({ title: "", text: "Adjunta los archivos requeridos", icon: "error" });
    }
  }

}
