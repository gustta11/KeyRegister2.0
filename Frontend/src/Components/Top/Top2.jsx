import { useState } from "react";
import './Top1.css'
import { IoPersonCircle } from "react-icons/io5";
import logoKG from '../../../public/logoKG.png';
function Top1 (){
    return(
        <>
    <div className="top">
    <h1>Key Register</h1>
   
    </div>
     <div className="subtopo">
     <IoPersonCircle size={50}/><h2>Docente</h2> 
    <img src={logoKG}/>
  </div>
  </>
    )
}

export default Top1