import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './guias.component.html',
  styleUrl: './guias.component.scss'
})
export class GuiasComponent implements OnInit {

  private http = inject(HttpClient)
  public guiasForm!: UntypedFormGroup;

  public guias: any[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder
  ) { }

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
      Swal.fire({
        icon: "error",
        title: "",
        text: "Rellena correctamente"
      });
    } else {
      this.http.post("http://127.0.0.1:8000/api/guias/getGuiasPerClient", { id_cliente: this.guiasForm.get("id_cliente")?.value }).subscribe((response: any) => {
        this.guias = response.message;
      })
    }

  }

}
