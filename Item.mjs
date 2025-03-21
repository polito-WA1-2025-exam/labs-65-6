import sqlite from "sqlite3";
import express from "express";
"use strict";

function Persona(nome, coloreCapelli,stileCapelli, età, occhi, occhiali,carnagione){
    this.nome=nome;
    this.coloreCapelli=coloreCapelli;
    this.stileCapelli = stileCapelli; // ricci, lisci etc
    this.età=età;
    this.occhi=occhi;
    this.occhiali=occhiali;
    this.carnagione=carnagione;
}

function Domanda(categoria){
    this.categoria=categoria;
}

/* 
const Ema = new Persona("Emanuele","castani","marroni",21,true)
console.log(Ema) */
//const setDomande = new Array[Domanda];//set di domande

// punto 2 lab 2        //promise che permette la lettura del database
function readAllItems(filename) {    
    const db = new sqlite.Database(filename,(err)=>{if (err) throw err;});
    const sql = 'SELECT * FROM ITEMS'
    const app = express();
    let persone = []    //array contenente gli item, ovvero le persone da indovinare
    const myPromise =          
        new Promise((resolve,reject) => {
            //retrieve all itemes from Items table
            db.all(sql,(err,rows)=>{
                if(err) throw err;
                
                for(let it of rows){
                    const p = new Persona(it.nome,it.coloreCapelli,it.stileCapelli,Number(it.età),it.occhi,it.occhiali,it.carnagione)
                    persone.push(p);     
                }
                resolve(persone); //fulfilled
                }) 
                
            //reject(err); //rejected
        }) 

    myPromise.then((persone)=>{
        console.log(persone);
    })

}

const filename = 'items.sqlite';
readAllItems(filename)