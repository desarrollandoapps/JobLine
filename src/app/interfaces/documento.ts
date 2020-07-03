export interface Documento {
    id: number,
    personaId: number,
    codigo: string,
    numero: number,
    ciudadId: number,
    direccion: string,
    fPedido: string,
    fEnvio?: string,
    estado: "0",
    vrTotal: number,
    codTransac: string,
    estadoTransac: string,
    proveEnvio: string,
    proveeGuia: string,
    nombreCli: String,
    telefono: string,
    email: string,
    codReferidor: string,
    persona?: string,
    items: any[]
  }