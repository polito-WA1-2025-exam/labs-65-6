
function Domanda(id,text,categoria,value){
    this.id=id;
    this.text=text;
    this.categoria=categoria;
    this.value=value
}

function Persona(id,nome, coloreCapelli,stileCapelli, età, occhi, occhiali,carnagione){
    this.id= id
    this.nome=nome;
    this.coloreCapelli=coloreCapelli;
    this.stileCapelli = stileCapelli; // ricci, lisci etc
    this.età=età;
    this.occhi=occhi;
    this.occhiali=occhiali;
    this.carnagione=carnagione;
}

export { Persona, Domanda };