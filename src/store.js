export const initialStore=()=>{
  return{
    agenda:[]
  }
}
export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'obtenerUsuario':
      return{
        ...store,
        agenda: action.payload
      }
    case 'añadirContacto':
      return{
        ...store,
        agenda: action.payload
      }
    case 'editarContacto':
      return{
        ...store,
        agenda: store.agenda.map(contacto => contacto.id === action.payload.id ? action.payload:contacto) 
      }
    case 'eliminarContacto':
      const contactoEncontrado = store.agenda.filter(contacto => contacto.id !== Number(action.payload))
      return{
        ...store,
        agenda: contactoEncontrado 
      }
default:
      throw Error('Unknown action.');
  }
}
