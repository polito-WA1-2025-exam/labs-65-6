"use strict";

function Persona(nome, capelli, occhi,età,occhiali){
    this.nome=nome;
    this.capelli=capelli;
    this.età=età;
    this.occhi=occhi;
    this.occhiali=occhiali;
}

function Domanda(categoria){
    this.categoria=categoria;
}


const Ema = new Persona("Emanuele","castani","marroni",21,true)
console.log(Ema)
const setDomande = new Array[Domanda];