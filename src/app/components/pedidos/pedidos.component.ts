import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RequestHTTPService } from '../../services/requestHTTP-component.service';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})

export class PedidosComponent implements OnInit {

  private http = inject(HttpClient)

  public pedidosForm!: UntypedFormGroup;
  public productos: any[] = []

  public cantidades: any = {
    producto1: 0,
    producto2: 0,
    producto3: 0,
  };

  constructor(
    private requestHTTPService: RequestHTTPService,
    private formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForms();
    this.getProductos();
  }

  initForms = () => {
    this.pedidosForm = this.formBuilder.group({
      id_cliente: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      nombre: [null, [Validators.required]],

      cantidades0: [null, [Validators.required]],
      cantidades1: [null],
      cantidades2: [null],

      direccion0: [null, [Validators.required]],
      direccion1: [null],
      direccion2: [null],

      precio0: [null, [Validators.required]],
      precio1: [null],
      precio2: [null],

      SKU0: [null, [Validators.required]],
      SKU1: [null],
      SKU2: [null],
    });
  }

  /* La función `getProductos` está realizando una solicitud HTTP al método `getProductos` del servicio
  `requestHTTPService`. Se suscribe a la respuesta y asigna los datos recibidos al array `productos`. */
  getProductos = () => {
    this.requestHTTPService.getProductos().subscribe((response: any) => {
      this.productos = [{ SKU: '', descripcion: '', dias_fabricacion: '', precio: '', tipo_producto: '' }];
      response.message.forEach((each: any) => {
        this.productos.push({ SKU: each.SKU, descripcion: each.descripcion, dias_fabricacion: each.dias_fabricacion, precio: each.precio, tipo_producto: each.tipo_producto });
      });
    })
  }

  /* La función `enviarPedido` se encarga de manejar la lógica cuando el usuario hace clic en el botón "Enviar Pedido". */
  enviarPedido = () => {

    if (!this.pedidosForm.valid) {
      Swal.fire({ icon: "error", title: "", text: "Rellena correctamente el pedido" });
    } else {

      const productos = [];

      for (let i = 0; i < 3; i++) {
        productos.push({
          direccion_entrega: this.pedidosForm.get(`direccion${i}`)?.value,
          cantidad: this.pedidosForm.get(`cantidades${i}`)?.value,
          SKU: this.pedidosForm.get(`SKU${i}`)?.value,
        })
      }

      const productosAEnviar = {
        id_cliente: this.pedidosForm.get("id_cliente")?.value,
        nombre: this.pedidosForm.get("nombre")?.value,
        apellido: this.pedidosForm.get("apellido")?.value,
        productos: productos,
      };

      this.addPedido(productosAEnviar);
    }

  }

  /* La función `addPedido` está realizando una solicitud HTTP al método `addPedido` del servicio
  `requestHTTPService`. Se suscribe a la respuesta y muestra un mensaje de éxito utilizando el método
  `Swal.fire` de la biblioteca SweetAlert2. */
  addPedido = (pedido: any) => {
    this.requestHTTPService.addPedido(pedido).subscribe((response: any) => {
      Swal.fire({ title: "", text: response.message, icon: "success" });
      this.pedidosForm.reset();
    })
  }

  /* La función `setArticulo` es un método que se llama cuando el usuario selecciona un artículo de un
  menú desplegable en la interfaz de usuario. Toma dos parámetros: `index`, que representa el índice
  del artículo seleccionado en el formulario, y `evento`, que representa el objeto de evento
  desencadenado por la selección. */
  setArticulo = (index: number, evento: any) => {
    const precio = this.productos.filter((each: any) => each.SKU == evento.target.value)[0].precio;
    this.pedidosForm.get(`SKU${index}`)?.setValue(evento.target.value);
    this.pedidosForm.get(`precio${index}`)?.setValue(precio);
  }

}
