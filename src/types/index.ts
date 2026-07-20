export type Product = {
  id: string;
  titulo: string;
  autor: string;
  descripcion: string;
  calificacion: number;
  genero: string;
  imagen: string;
  precio: number;
  stock: number;
  tipo: string;
  destacado?: boolean;
}

export type Coupon = {
  id:string;
  codigo:string;
  descuento:number;
}

