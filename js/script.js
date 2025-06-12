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
                    <button onclick= "AbrirModalEditar('${persona.id}' ,'${persona.Nombre}', '${persona.Apellido}', '${persona.Correo}')">Editar</button>
                    <button onclick="EliminarPersona(${persona.id})">Eliminar</button>
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
    const Nombre = document.getElementById("txtNombre").value.trim();
    const Apellido = document.getElementById("txtApellido").value.trim();
    const Correo = document.getElementById("txtCorreo").value.trim();

    if(!Nombre || !Apellido || !Correo){
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


//Funcion para borrar registros
async function EliminarPersona(id) {
    const confirmacion = confirm("¿Quieres eliminar este registro?");

    //Validamos si el usuario eligio aceptar
    if(confirmacion){
        await fetch(`${api_url}/${id}`, {
            method: "DELETE"
        }); //Llamada al endpoint

        //Recargar la tabla para actualizar la vista
        ObtenerRegistros();
    }
}


//Funcionalidad para editar registros
const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close(); //Cerrar ModalEditar
});


function AbrirModalEditar(id ,Nombre, Apellido, Correo){
    //Agregamos los valores a los input antes de abrir el modal
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = Nombre;
    document.getElementById("txtApellidoEditar").value = Apellido;
    document.getElementById("txtCorreoEditar").value = Correo;

    //Modal se abre despues de agregar los valores a los input
    modalEditar.showModal();
}

document.getElementById("frmEditar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que el formulario se envie de golpe

    //Capturamos los valores nuevos del formulario
    const id = document.getElementById("txtIdEditar").value;
    const Nombre = document.getElementById("txtNombreEditar").value.trim();
    const Apellido = document.getElementById("txtApellidoEditar").value.trim();
    const Correo = document.getElementById("txtCorreoEditar").value.trim();

    //Validacion de los campos
    if(!id || !Nombre || !Apellido || !Correo){
        alert("Complete los campos");
        return; //Evita que el codigo se siga ejecutando
    }

    //Llamada a la API
    const respuesta = await fetch(`${api_url}/${id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({Correo, Nombre, Apellido})
    }); 

    if(respuesta.ok){
        alert("Registro Actualizado con exito"); //Confirmacion
        modalEditar.close(); //Cerramos el modal
        ObtenerRegistros(); //Recargamos la tabla
    }
    else{
        alert("Hubo un error al actualizar");
    }
});