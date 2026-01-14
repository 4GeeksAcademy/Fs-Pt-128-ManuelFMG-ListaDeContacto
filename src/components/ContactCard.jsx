import { useNavigate } from "react-router-dom";
import { eliminarContacto } from "../APIServices/APIServices";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ObtenerUsuario } from "../APIServices/APIServices";
import { useState } from "react";



export const ContactCard = ({ contacts }) => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();
    const [showModal, setShowModal] = useState(false);


    const confirmDelete = async () => {
        await eliminarContacto(contacts.id);
        await ObtenerUsuario(dispatch);
        setShowModal(false);
    };



    return (

        <div key={contacts.id} className="row border border-secondary m-2 rounded" >
            <div className="col-3">
                <div className="imagen" >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNQzXI3nfgJy1h5IsAmOcSYdnU1VM32ZQWaQ&s" alt="Perfil" />
                </div>
            </div>
            <div className="col-6">
                <h3>{contacts.name}</h3>
                <p>
                    <i className="fa-solid fa-phone col-1"></i>
                    {contacts.phone}</p>
                <p>
                    <i className="fa-solid fa-at col-1"></i>
                    {contacts.email}</p>
                <p>
                    <i className="fa-solid fa-location-dot col-1"></i>
                    {contacts.address}</p></div>

            <div className="col-3 d-flex justify-content-end align-items-start">
                <button className="btn btn-success m-1"
                    onClick={() => navigate(`/form/${contacts.id}`)}>
                    <i class="fa-solid fa-user-pen"></i>
                </button>
                <button className="btn btn-danger m-1"
                    onClick={() => setShowModal(true)}>
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Eliminar contacto</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <p>
                                    ¿Estás seguro de que deseas eliminar a{" "}
                                    <strong>{contacts.name}</strong>?
                                </p>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={()=> eliminarContacto(contacts.id, dispatch)}
                                >
                                    Eliminar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>

    )
}

