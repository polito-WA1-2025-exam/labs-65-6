import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Domanda, Persona } from './model/QuestionPersonModel.mjs';
import PersonaDisplay from './components/Persona';
import QuestionDisplay from './components/Domande';
//import {Header, Footer} from './components/html';


function App() {
  const fakequestion= new Domanda(1,"Ha i capelli biondi?", "coloreCapelli", "biondo");
  const fakePersona= []
  fakePersona.push(new Persona(1,"Mario","biondo","ricci",30,"azzurri","no","chiara"));
  fakePersona.push(new Persona(2,"Luigi","castani","lisci",25,"marroni","si","scura"));
  const [questions, setQuestions] = useState([fakequestion]);
  const [persons, setPersons] = useState(fakePersona);

  return(
    <>
      Indovina chi sono!
      <QuestionDisplay questions={questions} />
      <PersonaDisplay persons={persons} />
      
    </>
  )
 
}

export default App
