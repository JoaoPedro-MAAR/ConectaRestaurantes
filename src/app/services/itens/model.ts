export interface Item {
  id?: number;
  nome: string;
  categoria: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}