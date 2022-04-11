export interface ContactDTO {
  contacts: {
    descricao?: string,
    idContato?: number,
    idPessoa?: number,
    numero?: string,
    tipoContato: string
  }[]
}