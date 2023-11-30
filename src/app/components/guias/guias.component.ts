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

  getDocumentosPerGuia = (guia: any) => {
    this.guiaActual = guia.id_guia;
    this.requestHTTPService.getDocumentosPerGuia(this.guiaActual).subscribe((response: any) => {
      this.documentosPerGuide = response.message;
    })
  }

  getGuiaPDF = (guia: any) => {
    this.guiaActual = guia.id_guia;
    this.requestHTTPService.getGuiaPDF(this.guiaActual, guia.id_cliente).subscribe((response: any) => {
      this.showPdf(response);
    })
  }

  getDocumentoPDF = (id_documento: any) => {
    this.requestHTTPService.getDocumentoPDF(this.guiaActual, id_documento).subscribe((response: any) => {
      this.showPdf(response);
    })
  }

  showPdf = (response: any) => {
    const blobUrl = URL.createObjectURL(response);
    window.open(blobUrl, '_blank');
  }

  setPDO = (guia: any) => {
    this.guiaActual = guia.id_guia;
    this.route.navigateByUrl('/POD/' + this.guiaActual);
  }

}
