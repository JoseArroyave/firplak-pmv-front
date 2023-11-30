import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RequestHTTPService } from '../../services/requestHTTP-component.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './guias.component.html',
  styleUrl: './guias.component.scss'
})
export class GuiasComponent implements OnInit {

  public guiasForm!: UntypedFormGroup;
  public route: Router;

  public documentosPerGuide: any[] = [];
  public guiaActual: string = '';
  public guias: any[] = [];

  constructor(
    private requestHTTPService: RequestHTTPService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.route = inject(Router);
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms = () => {
    this.guiasForm = this.formBuilder.group({
      id_cliente: [null, [Validators.required]],
    });
  }

  /* La función `getGuiasPerClient` se encarga de recuperar las guias (guías) de un cliente específico. */
  getGuiasPerClient = () => {

    if (!this.guiasForm.valid) {
      Swal.fire({ icon: "error", title: "", text: "Rellena correctamente" });
    } else {
      const id_cliente = this.guiasForm.get("id_cliente")?.value;
      this.requestHTTPService.getGuiasPerClient(id_cliente).subscribe((response: any) => {

        if (response.message.length > 0) {
          this.guias = response.message.reduce((resultado: any, objeto: any) => {
            if (!resultado.some((item: any) => item.id_guia === objeto.id_guia)) {
              resultado.push(objeto);
            }
            return resultado;
          }, []);
        } else {
          Swal.fire({ icon: "error", title: "", text: "No hay guías para ese cliente" });
        }

        this.guias = response.message;
      })
    }

    this.documentosPerGuide = [];
    this.guiaActual = '';
    this.guias = [];
  }

  /* La función `getDocumentosPerGuia` es recuperar los documentos asociados a una guía específica. */
  getDocumentosPerGuia = (guia: any) => {
    this.guiaActual = guia.id_guia;
    this.requestHTTPService.getDocumentosPerGuia(this.guiaActual).subscribe((response: any) => {
      this.documentosPerGuide = response.message;
    })
  }

  /* La función `getGuiaPDF` se encarga de recuperar el archivo PDF asociado a una guía específica. */
  getGuiaPDF = (guia: any) => {
    this.guiaActual = guia.id_guia;
    this.requestHTTPService.getGuiaPDF(this.guiaActual, guia.id_cliente).subscribe((response: any) => {
      this.showPdf(response);
    })
  }

  /* La función `getDocumentoPDF` se encarga de recuperar el archivo PDF asociado a un documento específico. */
  getDocumentoPDF = (id_documento: any) => {
    this.requestHTTPService.getDocumentoPDF(this.guiaActual, id_documento).subscribe((response: any) => {
      this.showPdf(response);
    })
  }

  /* La función `showPdf` es responsable de mostrar un archivo PDF en una nueva pestaña del navegador. */
  showPdf = (response: any) => {
    const blobUrl = URL.createObjectURL(response);
    window.open(blobUrl, '_blank');
  }

  /* La función `setPDO` se utiliza para configurar la guía actual y navegar a una ruta específica. */
  setPDO = (guia: any) => {
    this.guiaActual = guia.id_guia;
    this.route.navigateByUrl('/POD/' + this.guiaActual);
  }

}
