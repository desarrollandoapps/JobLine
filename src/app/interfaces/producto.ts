export interface Producto {
    id: number;
    categoriaId: number;
    codigo: string;
    nombre: string;
    detalle: string;
    precio: number;
    precioSu: number;
    stock: number;
    estado: Boolean;
    fotoArt: string;
    dcto: number;
    categoria?: number;
}