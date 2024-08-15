import React from "react";
import { Trash2, Pencil } from "lucide-react";

export default function List({text, onDelete,isDone, onEdit}) {
    return(
        <li className="list">
           <span>{text}</span>
           <span>{isDone ? "Realizado" : "Pendiente"}</span>
           <button onClick={onDelete} className="delete-btn"><Trash2/></button> 
           <button onClick={onEdit} className="delete-btn"><Pencil/></button> 
        </li>
    )
}