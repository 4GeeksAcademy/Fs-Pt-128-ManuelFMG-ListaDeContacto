import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ObtenerUsuario } from "../APIServices/APIServices.js";
import { useEffect } from "react";
import { ContactCard } from "../components/ContactCard.jsx";
import { useNavigate } from "react-router-dom";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();

	useEffect(() => {
		ObtenerUsuario(dispatch);
	}, [])

	return (
		<div className="container">
			<div className="d-flex justify-content-end my-3" >
				<button className="btn btn-primary"
					onClick={() => navigate("/form")}>
					Nuevo contacto
				</button>
			</div>
			{store.agenda.map(contacts => (
				<ContactCard key={contacts.id} contacts={contacts} />
			))}

		</div>

	);


};

