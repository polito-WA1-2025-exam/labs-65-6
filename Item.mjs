import sqlite from "sqlite3";
import dayjs from "dayjs";
import express, { response } from "express";
import e from "express";
"use strict";

const db= new sqlite.Database("items.sqlite", err =>{
    if (err) throw err;
})

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




function readAllItems(db) {       
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
        let port = 3000;
        app.get("/ITEMS", (req, res) => {
            db.all(sql, (err, rows) => {
                try{
                    res.json(rows);
                } catch(err){
                    res.status(500).json({error: err.message});
                }
            })
        });
        app.get("/ITEMS/hairColor/:colore", (req, res) => {
            const sqlColore="SELECT * FROM ITEMS WHERE coloreCapelli==?"
            db.all(sqlColore,[req.params.colore],(err,rows)=>{
                try{
                    res.json(rows);
                } catch(err){
                    res.status(500).json({erros: err.message});
                }
            }) 
        });
        app.get("/ITEMS/itemId/:itemId", (req, res) =>{
            const sqlItemId="SELECT * FROM ITEMS WHERE itemId==?"
            db.all(sqlItemId,[req.params.itemId],(err,rows)=>{
                try{
                    res.json(rows);
                } catch(err){
                    res.status(500).json({erros: err.message});;
                }
            }) 
        })
        app.post("/ITEMS/itemId/:itemId/name/:name/hairColor/:hairColor/stileCapelli/:stileCapelli/eta/:eta/occhi/:occhi/occhiale/:occhiale/carnagione/:carnagione", (req, res)=>{
            const sqlInsert="INSERT INTO ITEMS (itemId, nome, coloreCapelli, stileCapelli,età, occhi, occhiali, carnagione) VALUES (?,?,?,?,?,?,?,?)";
            db.run(sqlInsert, [
                req.params.itemId, req.params.name, req.params.hairColor, req.params.stileCapelli,
                req.params.eta, req.params.occhi, req.params.occhiale, req.params.carnagione
            ], (err) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.json({ message: "Successful insertion" });
                }
            });
        })
        app.post("/ITEMS/name/:name/hairColor/:hairColor/stileCapelli/:stileCapelli/eta/:eta/occhi/:occhi/occhiale/:occhiale/carnagione/:carnagione/itemId/:itemId", (req, res)=>{
            const sqlUpdate="UPDATE ITEMS SET nome = ?, coloreCapelli = ?, stileCapelli = ?, età = ?, occhi = ?, occhiali = ?, carnagione = ? WHERE itemId = ?";
            db.run(sqlUpdate,[req.params.name, req.params.hairColor, req.params.stileCapelli,
                req.params.eta, req.params.occhi, req.params.occhiale, req.params.carnagione, req.params.itemId],(err)=>{
                if(err){
                    res.status(500).json({error: err.message});
                } else{
                    res.json({message: "Successful updating"});
                }   
            })
        })
        app.post("/ITEMS/itemId/:itemId/name/:name", (req, res)=>{
            const sqlUpdate="UPDATE ITEMS SET nome=? WHERE itemId=?";
            db.run(sqlUpdate,[req.params.name, req.params.itemId],(err)=>{
                if(err){
                    res.status(500).json({error: err.message});
                } else{
                    res.json({message: "Successful updating"});
                }   
            })
        })
        app.post("/ITEMS/itemId/:itemId", (req,res)=>{
            const sqlDelete="DELETE FROM ITEMS WHERE itemId=?";
            db.run(sqlDelete,[req.params.itemId],(err)=>{
                if(err){
                    res.status(500).json({error: err.message});
                } else{
                    res.json({message: "Successful deleting"});
                } 
            })
        })
        app.listen(port, ()=>{
            console.log("Server in esecuzione su http://localhost:"+port);
        })
        
        
    /*myPromise.then((persone)=>{
        console.log(persone);
    })*/

}

function findAge(db) {        
    const sql = 'SELECT * FROM ITEMS WHERE età>30'
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

function create(db){

    const nome= 'Luca';
    const coloreCapelli= 'neri';
    const stileCapelli= 'moicano';
    const età= 45;
    const occhi= 'bianchi';
    const occhiali= 'si';
    const carnagione='abbronzato'
    const sql1= 'INSERT INTO ITEMS (nome, coloreCapelli, stileCapelli, età, occhi, occhiali, carnagione) VALUES (?, ?, ?, ?, ? , ?, ?)';

  let persone = [];

 
  const myPromise1 =          
  new Promise((resolve,reject) => {
      //retrieve all itemes from Items table
      db.run(sql1, [nome, coloreCapelli, stileCapelli, età, occhi, occhiali, carnagione], function(err) {
        if (err) {
          return console.error('Errore nell\'inserimento:', err.message);
        }
        console.log(`Nuovo record inserito con ID ${this.lastID}`);
      })})

  
  const myPromise =          
  new Promise((resolve,reject) => {
      //retrieve all itemes from Items table
      const sql = 'SELECT * FROM ITEMS'
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

  myPromise1
    .then((lastID) => {
      console.log(`Inserito nuovo record con ID ${lastID}`);
      // Dopo l'inserimento, esegui la lettura dei dati
    })
    
    myPromise.then((persone) => {
      console.log("Tutti i record nel database:");
      console.log(persone); // Stampa i record letti dal database
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
}






    





const filename = 'items.sqlite';
const prova='copia.sqlite';
//const db = new sqlite.Database(filename,(err)=>{if (err) throw err;}); 
const copiadb= new sqlite.Database(prova,(err)=>{if (err) throw err;}); 
//readAllItems(db);
//findAge(db);
create(copiadb);



