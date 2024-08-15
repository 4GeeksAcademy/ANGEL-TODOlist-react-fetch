import React, { useCallback, useEffect, useState } from "react";
import List from "./List";
import Modal from "./Modal";

//create your first component
const Home = () => {
	
	const [list, setList] = useState([])
	const [user, setUser] = useState("")
	const [input, setInput] = useState("")
	const [selectedId, setSelectedId] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editInput, setEditInput] = useState("")
	

	
	//Cargar usuario al cargar la pagina
	const fetchUser = async () => {
		//Obtener usuario
		let res = await fetch(`https://playground.4geeks.com/todo/users/AngelSV`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json'
			}
		})

		//Si existe el usuario asignarselo al estado
		if (res.ok) {
			const data = await res.json()
			if (data.name) {
				console.log(data)
				setUser(data.name)
				setList(data.todos)
				return
			}
		}
		//Si no existe el usuario crearlo
		res = await fetch(`https://playground.4geeks.com/todo/users/AngelSV`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			}
		})

		if (res.ok) {
			const data = await res.json()
			setUser(data.name)
		}
	}

	//Llamar al usuario al cargar la página
	useEffect(() => {
        fetchUser()
    }, [])


	//Cambios en input
	const inputChanges = (event) => {
		setInput(event.target.value)
	}

	//Crear tarea
	const createTask = async (event) => {
		if(event.key === "Enter" && input.trim()){
			const newTask = {
				label: input.trim(),
				is_done: false
			}
			const res = await fetch("https://playground.4geeks.com/todo/todos/AngelSV", {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(newTask)
			})
			if(res.ok){
				fetchUser()
				console.log("Agregado correctamente")
				setInput("")
			}
		}
	}
	
	//Actualizar tarea 
	const updateTask = async () => {
		const res = await fetch(`https://playground.4geeks.com/todo/todos/${selectedId}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({label: editInput})
		})
		if(res.ok){
			fetchUser()
			handleCloseModal()
		}
	}

	//Eliminar tarea 
	const deleteTask = async (id) => {
		const res = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: 'DELETE',
		})
		if(res.ok){
			fetchUser()
		}
	}

	
	//Abrir modal y setear id
	const handleOpenModalUpdate = (id) => {
		setIsModalOpen(true)
		setSelectedId(id)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedId(null)
	}


	return (
		<section className="section">
			<Modal 
				isOpen={isModalOpen} 
				onClose={handleCloseModal}
				onUpdate={updateTask}
				editInput={editInput}
				setEditInput={setEditInput}
			/>
			<h1>TODO-list for {user}</h1>
			<div className="ul-section">
				<ul>
					<input
						className="input"
						type="text"
						value={input}
						onChange={inputChanges}
						onKeyDown={createTask}
						placeholder="Your tasks here"
					/>
					{list.map((item, index) => {
						return(
							<List 
								key={index} 
								text={item.label}
								isDone={item.is_done}
								onDelete={() => deleteTask(item.id)}
								onEdit={() => handleOpenModalUpdate(item.id)}
							/>
						)
					})}
				</ul>
				<div className="items-left">
					{list.length > 0 ? `${list.length} items left` : "No items left, add items"}
				</div>
			</div>
		</section>
	);
};

export default Home;
