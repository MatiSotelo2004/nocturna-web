export interface Product {
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

export interface Coupon {
  id: string;
  codigo: string;
  descuento: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  id: string;
  titulo: string;
  precio: number;
  quantity: number;
  imagen: string;
  autor: string;
}

export interface Order {
  id?: string;
  userId?: string;
  clienteEmail: string;
  clienteNombre: string;
  items: OrderItem[];
  subtotal: number;
  descuento: number;
  total: number;
  cupon: Coupon | null;
  estado: "completada" | "cancelada";
  createdAt?: any;
}



