export default class Mensagem {
    conteudo;
    id;
    rotas;
    menu;
    constructor() {
        this.rotas = {};
    }    
  
    toString() {
        let _menu = this.menu ? `\n\n${this.menu}` : '';
        return `${this.conteudo}${_menu}`;
    }




}