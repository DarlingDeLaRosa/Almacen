
export interface User {

  rol: string
  //rol: {
  //  idRol: number,
  //  nombreRol: number
  //};
  name: string;

}


export interface AppState {
  path: string
  user:  User;
  edit: any
}
