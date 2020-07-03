import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/carousel.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Departamento } from 'src/app/interfaces/departamento'
import { Ciudad } from 'src/app/interfaces/ciudad';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';
import { Documento } from 'src/app/interfaces/documento';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css', '../../../../assets/css/fontawesome/css/all.min.css']
})
export class FinalizarComponent implements OnInit {

  API_ENDPOINT_DOC = "http://joblinefree.com:98/api/Documento";
  API_ENDPOINT_DEPTO = "http://joblinefree.com:98/api/Dpto";
  API_ENDPOINT_CIUDADES = "http://joblinefree.com:98/api/Ciudad";
  API_ENDPOINT_REFERIDOR = "http://joblinefree.com:98/api/Persona/Referidor?CodRef="
  API_ENDPOINT_PAYU = "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu"

  form: FormGroup;

  cartItems = [];
  cartTotal = 0;
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
      // id: 168,
      personaId: new FormControl('32'),
      codigo: new FormControl('CM1'),
      // numero: 23,
      ciudadId: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      // fPedido: "2020-07-01T16:45:34+00:00",
      // fEnvio: null,
      estado: new FormControl('0'),
      // vrTotal: 125900.00,
      codTransac: new FormControl(''),
      estadoTransac: new FormControl(''),
      proveEnvio: new FormControl(''),
      proveeGuia: new FormControl(''),
      nombreCli: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      codReferidor: new FormControl(''),
      // persona: null,
      // items: [
      //   {
      //       "id": 0,
      //       "documentoId": 0,
      //       "articuloId": 24,
      //       "nombreArt": "Auriculares Bluetooth TaoTronics inalámbricos TWS para deporte TT-BH053",
      //       "cantidad": 1,
      //       "dcto": 0.00,
      //       "vrUnitario": 125900.00,
      //       "vrTotal": 125900.00
      //   }
      // ]
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
    //Obtener los productos
    this.obtenerProductos()    
  }

  obtenerProductos()
  {
    if (localStorage.getItem('codigo'))
    {
      var codigosStr = localStorage.getItem('codigo')
      var codigos = codigosStr.split('|')
      var nombresStr = localStorage.getItem('nombre')
      var nombres = nombresStr.split('|')
      var detalleStr = localStorage.getItem('detalle')
      var detalles = detalleStr.split('|')
      var precioStr = localStorage.getItem('precioSu')
      var precios = precioStr.split('|')
      var fotoStr = localStorage.getItem('fotoArt')
      var fotos = fotoStr.split('|')
      var cantidadStr = localStorage.getItem('cantidad')
      var cantidad = cantidadStr.split('|')

      for (var i = 0; i < codigos.length; i++)
      {
        var existe:boolean = this.existeProducto(codigos[i], parseInt(cantidad[i]))

        if (!existe)
        {
          this.cartItems.push({
            id: codigos[i],
            cantidad: cantidad[i],
            nombre: nombres[i],
            precioSu: precios[i],
            foto: fotos[i]
          });
        }        
      }
      this.cartTotal = 0;
      this.cartItems.forEach(item => {
        this.cartTotal += item.cantidad * item.precioSu;
      });
    }
  }

  existeProducto(codigo: string, cantidad:number): boolean {
    let existe = false;
    for ( let i in this.cartItems ) {
      if ( this.cartItems[i].id === codigo ) {
        this.cartItems[i].cantidad = parseInt(this.cartItems[i].cantidad) + cantidad;
        existe = true;
        return existe;
      }
    }
    return existe;
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
      vrTotal: this.cartTotal,
      codTransac: "",
      estadoTransac: "",
      proveEnvio: "",
      proveeGuia: "",
      nombreCli: datosForm.nombreCli,
      telefono: datosForm.telefono,
      email: datosForm.email,
      codReferidor: this.codigoReferidor,
      persona: null,
      items: this.convertirProductosJson(this.cartItems)
    };

    if (datosForm.codigoReferidor !== '')
    {
      this.httpClient.post(this.API_ENDPOINT_DOC, documentoInicial).subscribe(
        (documento: Documento) => {
          this.id = documento.id
          this.numero = documento.numero
          console.log('Doc nuevo: ' + documento);
          
          //Enviar a PayU
          this.enviarAPayU( documento )
        },
        response => {
          this.errorMessage = '';
          console.log(response.error)

        }
      );
      
      // this.productos = this.cartService.clearCart();
      // this.checkoutForm1.reset();

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

    this.errorMessage = '';

    if (datosForm.codReferidor !== '')
    {
      this.httpClient.get(this.API_ENDPOINT_REFERIDOR + datosForm.codReferidor ).subscribe(
        (personaId) => {
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

  // convenience getter for easy access to form fields
  get f() { return this.checkoutForm2.controls; }

  convertirProductosJson(p: any[]): JSON[]
  {
    let pJson = new Array();
    p.forEach(item => {
      pJson.push( {
        id: 0, 
        documentoId: 0, 
        articuloId: parseInt(item.id), 
        nombreArt: item.nombre,
        cantidad: parseInt(item.cantidad), 
        dcto: 0.00, 
        vrUnitario: parseFloat(item.precioSu),
        vrTotal: parseFloat(item.cantidad) * parseFloat(item.precioSu)
      })
    })
    
    return pJson;
  }

  enviarAPayU( documento: Documento )
  {
    let params = new HttpParams();
    params = params.append('merchantId', '508029');
    params = params.append('referenceCode', 'CM1-' + documento.numero);
    params = params.append('description', 'Compra de productos');
    params = params.append('amount', '' + documento.vrTotal);
    params = params.append('tax', '0');
    params = params.append('taxReturnBase', '0');
    params = params.append('accountId', '512321');
    params = params.append('signature', '5886034cd4f46a895366f7de837304da');
    params = params.append('currency', 'COP');
    params = params.append('payerFullName', 'APPROVED');
    params = params.append('buyerFullName', 'APPROVED');
    params = params.append('buyerEmail', documento.email);
    params = params.append('shippingAddress', documento.direccion);
    params = params.append('shippingCity', this.obtenerNombreCiudad(documento.ciudadId));
    params = params.append('shippingCountry', 'CO');
    params = params.append('telephone', documento.telefono,);
    params = params.append('test', '1');
    params = params.append('responseUrl', 'http://appincdevs.com/ResponsePayu.php');

    let payuJson = {
      merchantId:508029,
      referenceCode:'CM1-' + documento.numero,
      description:'Compra+de+productos',
      amount:documento.vrTotal,
      tax:0,
      taxReturnBase:0,
      accountId:512321,
      signature:'5886034cd4f46a895366f7de837304da',
      currency:'COP',
      payerFullName:'APPROVED',
      buyerFullName: documento.nombreCli,
      buyerEmail: documento.email,
      shippingAddress: documento.direccion,
      shippingCity: this.obtenerNombreCiudad(documento.ciudadId),
      shippingCountry:'CO',
      telephone: documento.telefono,
      test:1,
      responseUrl:'http://appincdevs.com/ResponsePayu.php'
    }
    
    this.httpClient.post(this.API_ENDPOINT_PAYU, payuJson).subscribe(
      (respuesta) => {
        console.log('Envió');
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  obtenerNombreCiudad( numCiudad: number ): string{

    let ciudad: string = ''
    this.ciudadesFull.forEach(c => {
      if ( c.id == numCiudad && ciudad === '')
      {        
        ciudad = c.nombre
      }
    })

    return ciudad;
  }

}
