import React from "react";

export default function Modal({isOpen, onClose, onUpdate, editInput, setEditInput}) {

    if(!isOpen){
        return null
    }

    const handleInputChange = (event) => {
        setEditInput(event.target.value)
    }

    return(
        <div className="modal-container">
            <div className="modal-update">
                <h2>Editar tarea</h2>
                <input value={editInput} onChange={handleInputChange}/>
                <div className="modal-buttons">
                    <button className="update-btn" onClick={onUpdate}>Actualizar</button>
                    <button className="close-btn" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}