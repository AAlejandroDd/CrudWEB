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


//Procesos para agregar registros 
const modal = document.getElementById("mdAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); //Boton para abrir
const btnCerrar = document.getElementById("btnCerrarModal"); //Boton para cerrar

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abre el modal cuando a btnAgregar se le hace clic
});

btnCerrar.addEventListener("click", ()=>{
    modal.close(); //Cerrar Modal
});


//Agregar un nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que los datos se envien por defecto

    //Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtCorreo").value.trim();

    if(!nombre || !apellido || !correo){
        alert("Complete todos los campos");
        return; //Evite que el codigo se siga ejecutando
    }

    //Llamar a la API para enviar los datos
    const respuesta = await fetch(api_url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({Nombre, Apellido, Correo})
    });

    if(respuesta.ok){
        //Mensaje de confirmacion
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal (dialog)
        modal.close();

        //Recargar la tabla
        ObtenerRegistros();
    }
    else{
        alert("Hubo un error al guardar");
    }
        
});
