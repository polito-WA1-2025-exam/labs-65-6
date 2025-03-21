import sqlite from "sqlite3";
import express, { response } from "express";
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

const filename = 'items.sqlite';
readAllItems(filename)