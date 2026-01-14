import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { crearContacto } from "../APIServices/APIServices";
import { editarContacto } from "../APIServices/APIServices";




export const Form = () => {
    const navigate = useNavigate();
    const { store } = useGlobalReducer();
    const { dispatch } = useGlobalReducer();
    const { id } = useParams();

    const [editando, setEditando] = useState(false)

    const [contacto, setContacto] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    useEffect(() => {
        if (id) {
            const contactoEncontrado = store.agenda.find(contact => contact.id === Number(id))
            setContacto(contactoEncontrado)
            setEditando(true)
        } else {
            setContacto(
                {
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                })
            setEditando(false)
        }
    }, []);

    const handleChange = (e) => {
        setContacto({
            ...contacto,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editando) {
            await editarContacto(contacto.id, contacto);
            dispatch({ type: 'editarContacto', payload: contacto })
        } else {
            await crearContacto(contacto);
            dispatch({ type: 'editarContacto', payload: contacto })
        }

        navigate("/");
    };

    return (
        <div className="container d-flex justify-content-center">
            <form className="form-card shadow p-4" onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">
                    {id ? "Editar contacto" : "Nuevo contacto"}
                </h2>

                <input
                    className="form-control mb-3"
                    name="name"
                    placeholder="Nombre completo"
                    value={contacto.name}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    name="phone"
                    placeholder="Teléfono"
                    value={contacto.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    name="email"
                    placeholder="Email"
                    value={contacto.email}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-4"
                    name="address"
                    placeholder="Dirección"
                    value={contacto.address}
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-primary w-100"
                    type="submit">
                    Guardar contacto
                </button>
            </form>
        </div>
    );
};
