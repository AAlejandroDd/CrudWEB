//Direccion 
const api_url  = "https://retoolapi.dev/FPoQJ7/Integrantes";

//Funcion que llama a la API y realiza una solicitud GET. Obtiene un JSON.
async function ObtenerRegistros(){
    //Hacemos GET al servidor y obtenemos su respuesta (response)
    const respuesta = await fetch(api_url);

    //Obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json(); //Esto es un JSON

    //Llamamos mostrarRegistros y le enviamos el JSON
    MostrarRegistros(data);

}


//funcion para generar las filas de la tabla 
//"Datos" representa al JSON
function MostrarRegistros(datos){

    //se llama al elemento tbody dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar codigo HTML usamos innerHTML
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.Nombre}</td>
                <td>${persona.Apellido}</td>
                <td>${persona.Correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    }); //Por cada persona en el JSON
    
}



ObtenerRegistros();