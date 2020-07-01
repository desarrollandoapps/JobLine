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
  API_ENDPOINT_DEPTO = "http://joblinefree.com:98/api/Dpto";
  API_ENDPOINT_CIUDADES = "http://joblinefree.com:98/api/Ciudad";
  API_ENDPOINT_REFERIDOR = "http://joblinefree.com:98/api/Persona/Referidor?CodRef="

  form: FormGroup;

  productos;
  checkoutForm1;
  checkoutForm2: FormGroup;
  errorMessage;
  codigoReferidor = 'Appinc';
  existeVendedor: boolean = false;
  disabledCiudad: boolean = false;
  deptos: Departamento[];
  ciudadesFull: Ciudad[];
  ciudades: Ciudad[];

  id;
  numero;
  personaId;

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
    //Obtener departamentos
    this.httpClient.get(this.API_ENDPOINT_DEPTO).subscribe((data: Departamento[]) => {
      this.deptos = data;
    });
    //Obtener ciudades
    this.httpClient.get(this.API_ENDPOINT_CIUDADES).subscribe((data: Ciudad[]) => {
      this.ciudadesFull = data;
    });
    //TODO: Obtener los productos
  }

  onSelectDepto(id: number):void
  {
    this.ciudades = this.ciudadesFull.filter(ciudad => ciudad.dptoId == id)
  }

  onSubmit(datosForm) {
    //Obtener consecutivos

    let fecha = new Date().toISOString();
    fecha = fecha.substring(0, 19);

    let documentoInicial = {
      id: 168,
      personaId: this.personaId,
      codigo: 'CM1',
      numero: 23,
      ciudadId: parseInt(datosForm.ciudadId),
      direccion: datosForm.direccion,
      fPedido: fecha,
      fEnvio: null,
      estado: '0',
      vrTotal: 125900.00,
      codTransac: "",
      estadoTransac: "",
      proveEnvio: "",
      proveeGuia: "",
      nombreCli: datosForm.nombreCli,
      telefono: datosForm.telefono,
      email: datosForm.email,
      codReferidor: this.codigoReferidor,
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
    console.log( 'documentoInicial: ' + documentoInicial );
    console.log('Json: ' + datosForm ) ;
    // var formData: any = new FormData();
    // formData.append("ciudadId", this.form.get('ciudadId').value);

    console.log( 'datosForm.codigoReferidor: ' + datosForm.codigoReferidor );

    if (datosForm.codigoReferidor !== '')
    {
      this.httpClient.post(this.API_ENDPOINT_DOC, documentoInicial).subscribe(
        (documento) => {
          console.log('Documento: ' + documento);
        },
        response => {
          this.errorMessage = '';
          console.log(response.error)

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

  validarReferidor( datosForm ) {

    console.log( 'datosForm.codReferidor' + datosForm.codReferidor );
    this.errorMessage = '';

    if (datosForm.codReferidor !== '')
    {
      this.httpClient.get(this.API_ENDPOINT_REFERIDOR + datosForm.codReferidor ).subscribe(
        (personaId) => {
          console.log( 'personaId: ' + personaId );
          if( personaId !== 0 ) {
            this.personaId = personaId;
            this.codigoReferidor = datosForm.codReferidor;
            this.existeVendedor = true;
          }
          else {
            this.errorMessage = 'No existe el referidor con el código dado';
          }
        });
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Ocurrió un error',
        text: '¡Debe ingresar el código del referidor!'
      });
    }
  }

}
