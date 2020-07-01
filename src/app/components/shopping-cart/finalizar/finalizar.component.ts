import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/carousel.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Departamento } from 'src/app/interfaces/departamento'
import { Ciudad } from 'src/app/interfaces/ciudad';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class FinalizarComponent implements OnInit {

  API_ENDPOINT_DOC = "http://joblinefree.com:98/api/Documento";
  API_ENDPOINT_DEPTO = "http://joblinefree.com:98/api/";
  API_ENDPOINT_CIUDAD = "http://joblinefree.com:98/api/";

  form: FormGroup;

  productos;
  checkoutForm1;
  checkoutForm2;
  errorMessage;
  codigoReferidor = 'Appinc';
  existeVendedor: boolean = false;
  disabledCiudad: boolean = false;
  deptos: Departamento[] = [{Id:1, Nombre:'Amazonas'}, {Id:2, Nombre:'Tolima'}];
  ciudadesFull: Ciudad[] = [{Id:1, NOMBRE:'Leticia', DptoId:1}, {Id:73001, NOMBRE:'Ibagué', DptoId:2}]
  ciudades: Ciudad[];

  id;
  numero;

  constructor(private carouselService: CarouselService, private formBuilder: FormBuilder,
    private httpClient: HttpClient) {
    this.carouselService.updateCarouselMessage(false);

    this.checkoutForm1 = this.formBuilder.group({
      codReferidor: ''
    });

    this.checkoutForm2 = this.formBuilder.group({
      id: 168,
      personaId: 32,
      codigo: "CM1",
      numero: 23,
      ciudadId: '',
      direccion: '',
      fPedido: "2020-05-26T16:45:34+00:00",
      fEnvio: null,
      estado: "0",
      vrTotal: 125900.00,
      codTransac: "",
      estadoTransac: "",
      proveEnvio: "",
      proveeGuia: "",
      nombreCli: '',
      telefono: '',
      email: '',
      codReferidor: '',
      persona: null,
      items: [
        {
            "id": 0,
            "documentoId": 0,
            "articuloId": 24,
            "nombreArt": "Auriculares Bluetooth TaoTronics inalámbricos TWS para deporte TT-BH053",
            "cantidad": 1,
            "dcto": 0.00,
            "vrUnitario": 125900.00,
            "vrTotal": 125900.00
        }
      ]
    });
  }

  ngOnInit(): void {
    //TODO: Obtener departamentos
    // this.httpClient.get(this.API_ENDPOINT_DEPTO).subscribe((data: Departamento[]) => {
    //   this.deptos = data;
    // });
    //TODO: Obtener ciudades
    //TODO: Obtener los productos
  }

  onSelectDepto(id: number):void
  {
    this.ciudades = this.ciudadesFull.filter(ciudad => ciudad.DptoId == id)
  }

  onSubmit(datosForm) {
    //Obtener consecutivos
    let cualquierCosa = {
      id: 168,
      personaId: 32,
      codigo: "CM1",
      numero: 23,
      ciudadId: 73001,
      direccion: 'mirador de yerbabuena',
      fPedido: "2020-05-26T16:45:34+00:00",
      fEnvio: null,
      estado: "0",
      vrTotal: 125900.00,
      codTransac: "",
      estadoTransac: "",
      proveEnvio: "",
      proveeGuia: "",
      nombreCli: 'Jose',
      telefono: '305',
      email: 'jose@gmail.com',
      codReferidor: 'Appinc',
      persona: null,
      items: [
        {
            "id": 0,
            "documentoId": 0,
            "articuloId": 24,
            "nombreArt": "Auriculares Bluetooth TaoTronics inalámbricos TWS para deporte TT-BH053",
            "cantidad": 1,
            "dcto": 0.00,
            "vrUnitario": 125900.00,
            "vrTotal": 125900.00
        }
      ]
    };
    console.log( 'cualquierCosa: ' + cualquierCosa );
    console.log('Json: ' + datosForm ) ;
    // var formData: any = new FormData();
    // formData.append("ciudadId", this.form.get('ciudadId').value);

    console.log( 'datosForm.codigoReferidor: ' + datosForm.codigoReferidor );

    if (datosForm.codigoReferidor !== '')
    {
      this.httpClient.post(this.API_ENDPOINT_DOC, cualquierCosa).subscribe(
        (documento) => {
          console.log("Documento", documento);
        },
        response => {
          this.errorMessage = ''
          console.log(response.error)
          if(response.error.Message === "ERROR: Vendedor no existe") {
            this.errorMessage = response.error.Message;
          }
          else if(response.error.Message === "ERROR: No envio datos del vendedor") {
            this.errorMessage = response.error.Message;
          }
          else if(response.error.title === "One or more validation errors occurred.") {
            this.errorMessage = 'Debe ingresar todos los campos';
          }
          else {
            this.codigoReferidor = datosForm.codReferidor
            this.existeVendedor = true
          }
        }
      );

      // this.productos = this.cartService.clearCart();
      // this.checkoutForm1.reset();

      console.warn('Su orden ha sido enviada.', datosForm);
    }
    else {
      this.errorMessage = 'Debe ingresar el código del referidor';
      Swal.fire({
        icon: 'warning',
        title: 'Ocurrió un error',
        text: '¡Debe ingresar el código del referidor!'
      })
    }

  }

}
