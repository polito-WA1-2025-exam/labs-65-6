import { useState } from "react";
import { Table, Button , Form} from "react-bootstrap";
import { Domanda } from "../model/QuestionPersonModel.mjs";

function PersonaDisplay(props){

    const ans= props.ans;

    return <Table>
        <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Colore Capelli</th>
                <th scope="col">Stile Capelli</th>
                <th scope="col">Età</th>
                <th scope="col">Occhi</th>
                <th scope="col">Occhiali</th>
                <th scope="col">Carnagione</th>
            </tr>
        </thead>
        <tbody>
            {ans.map(p => <PersonaRow key={p.id} persona={p} {...props}/>)}
        </tbody>
        
    </Table>

}

function PersonaRow(props){
    const a =props.ans;
    return <tr> 
        <td>{a.nome}</td>
        <td>{a.coloreCapelli}</td>
        <td>{a.stileCapelli}</td>
        <td>{a.età}</td>
        <td>{a.occhi}</td>
        <td>{a.occhiali ? "Si" : "No"}</td>
        <td>{a.carnagione}</td>
    </tr>
}

export default PersonaDisplay;