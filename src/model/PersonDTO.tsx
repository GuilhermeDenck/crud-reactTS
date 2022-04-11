import { ContactDTO } from './ContactDTO';

export interface PersonDTO {
  persons: {
    contatosList?: ContactDTO,
    idPessoa?: number,
    cpf: string,
    dataNascimento: string,
    email: string,
    nome: string
  }[]
}

export interface UserDTO {
  idPessoa?: number,
  cpf: string;
  dataNascimento: string;
  email: string;
  nome: string;
}