const API_URL = 'https://playground.4geeks.com/contact'
const USER = 'Manuel'

/* Crear Usuario */
export const ObtenerUsuario = async (dispatch) => {
    const response = await fetch(`${API_URL}/agendas/${USER}`)
    if (!response.ok) {
        crearAgenda();
        return
    }
    const data = await response.json()
    console.log(data);
    dispatch({ type: 'obtenerUsuario', payload: data.contacts })

}

/* Crear Agenda */
const crearAgenda = async () => {
    const response = await fetch(`${API_URL}/agendas/${USER}`,
        { method: "POST" }
    )
    return response.ok
}

/* Crear contacto */
export const crearContacto = async (contacto) => {
    const response = await fetch(`${API_URL}/agendas/${USER}/contacts`, {
        method: "POST",
        body: JSON.stringify(contacto),
        headers: { "Content-Type": "application/json" },
    });
    return response.ok;
};

/* Editar Contacto */
export const editarContacto = async (id, contacto) => {
    const response = await fetch(`${API_URL}/agendas/${USER}/contacts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            name: contacto.name,
            phone: contacto.phone,
            email: contacto.email,
            address: contacto.address,
        }),
        headers: { "Content-Type": "application/json" },
    });
    return response.ok;
};

/* Eliminar Contacto */
export const eliminarContacto = async (id, dispatch) => {
    const response = await fetch(`${API_URL}/agendas/${USER}/contacts/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch({ type: 'eliminarContacto', payload: id })
    }
};

