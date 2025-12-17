//Arreglos de ejemplo
var notasCurso1 = [8, 6, 7, 4, 9, 5, 10, 3, 6, 7];
var notasCurso2 = [5, 2, 6, 8, 9, 4, 6, 7, 5, 8];
var notasCurso3 = [8, 4, 6, 5, 7, 8, 10, 9, 10, 6];

var notas = [];

//Cargo los elementos a variables
var btnConsultarCurso = document.getElementById("btnConsultarCurso");
var selectCurso = document.getElementById("selectCurso");

var totalAprobados = document.getElementById("totalAprobados");
var totalSupletorios = document.getElementById("totalSupletorios");
var totalReprobados = document.getElementById("totalReprobados");
var promedioGeneral = document.getElementById("promedioGeneral");
var estadoCurso = document.getElementById("estadoCurso");

var seccionFiltros = document.getElementById("seccionFiltrosAlumnos");
var seccionTabla = document.getElementById("seccionTablaAlumnos");
var tbodyDetalle = document.getElementById("tbodyDetalleAlumnos");

var btnMostrarAprobados = document.getElementById("btnMostrarAprobados");
var btnMostrarSupletorios = document.getElementById("btnMostrarSupletorios");
var btnMostrarReprobados = document.getElementById("btnMostrarReprobados");
var btnMostrarTodos = document.getElementById("btnMostrarTodos");


var btnModificarNotas = document.getElementById("btnModificarNotas");
var seccionModificarNotas = document.getElementById("seccionModificarNotas");
var inputNuevaNota = document.getElementById("inputNuevaNota");
var btnAnadirNota = document.getElementById("btnAnadirNota");
var btnBorrarNota = document.getElementById("btnBorrarNota");
var contenedorTablaResumen = document.getElementById("contenedorTablaResumen");


var modoModificacion = false;


btnConsultarCurso.addEventListener("click", () => {
    cargarNotasCurso();
    if(notas.length > 0)
    procesarNotas();
});

btnMostrarAprobados.addEventListener("click", () => mostrarTabla("Aprobado"));
btnMostrarSupletorios.addEventListener("click", () => mostrarTabla("Supletorio"));
btnMostrarReprobados.addEventListener("click", () => mostrarTabla("Reprobado"));
btnMostrarTodos.addEventListener("click", () => mostrarTabla("Todos"));

btnModificarNotas.addEventListener("click", ModoModificacion);
btnAnadirNota.addEventListener("click", anadirNota);
btnBorrarNota.addEventListener("click", borrarUltimaNota);


// hago la funcion para procesar las notas

function cargarNotasCurso() {

    var cursoSeleccionado = selectCurso.value;

    if (cursoSeleccionado === "curso1") {
        notas = notasCurso1;
    } else if (cursoSeleccionado === "curso2") {
        notas = notasCurso2;
    } else if (cursoSeleccionado === "curso3") {
        notas = notasCurso3;
    } else {
        notas = [];
        alert("Seleccione un curso válido");
    }
}


function procesarNotas() {

    let contadorAprobados = 0;
    let contadorSupletorios = 0;
    let contadorReprobados = 0;
    let sumaNotas = 0;

    // Limpio la tabla 
    tbodyDetalle.innerHTML = "";



    notas.forEach((nota) => {

        let estado = "";


        // Clasifico las notas

        if (nota >= 7 && nota <= 10) {
            estado = "Aprobado";
            contadorAprobados++;
        } else if (nota >= 5 && nota <= 6) {
            estado = "Supletorio";
            contadorSupletorios++;
        } else {
            estado = "Reprobado";
            contadorReprobados++;
        }

        // Sumar notas para el promedio
        sumaNotas += nota;

        // Agregar fila a la tabla detalle
        let fila = `
            <tr>
                <td>${nota}</td>
                <td>${estado}</td>
            </tr>
        `;
        tbodyDetalle.innerHTML += fila;
    });

    var promedio = (sumaNotas / notas.length).toFixed(2);

    let estadoFinalCurso = "";
    if (promedio >= 7) {
        estadoFinalCurso = "Curso Aprobado";
    } else {
        estadoFinalCurso = "Curso en Riesgo";
    }

    totalAprobados.textContent = contadorAprobados;
    totalSupletorios.textContent = contadorSupletorios;
    totalReprobados.textContent = contadorReprobados;
    promedioGeneral.textContent = promedio;
    estadoCurso.textContent = estadoFinalCurso;

    //Mostrar cosas ocultas
    if(modoModificacion)seccionFiltros.style.display = "none";
    else seccionFiltros.style.display = "flex";
    seccionTabla.style.display = "flex";
}


function mostrarTabla(estadoFiltro) {

    // Limpiar tabla
    tbodyDetalle.innerHTML = "";

    notas.forEach((nota) => {

        let estado = "";

        if (nota >= 7 && nota <= 10) {
            estado = "Aprobado";
        } else if (nota >= 5 && nota <= 6) {
            estado = "Supletorio";
        } else {
            estado = "Reprobado";
        }

        // Se define que se va a mostrar
        if (estadoFiltro === "Todos" || estado === estadoFiltro) {
            let fila = `
                <tr>
                    <td>${nota}</td>
                    <td>${estado}</td>
                </tr>
            `;
            tbodyDetalle.innerHTML += fila;
        }
    });
}



function ModoModificacion() {
    modoModificacion = !modoModificacion;
    
    if (modoModificacion) {

        btnModificarNotas.textContent = "REGRESAR";
        btnModificarNotas.classList.remove("btn-primary");
        btnModificarNotas.classList.add("btn-danger");


        seccionFiltros.style.display = "none";
        document.getElementById("tablaResumenCurso").style.display = "none";
        seccionFiltros.style.display = "none";

        seccionModificarNotas.style.display = "flex";
        
        inputNuevaNota.value = "";
        
        
    } else {
        btnModificarNotas.textContent = "MODIFICAR NOTAS";
        btnModificarNotas.classList.remove("btn-danger");
        btnModificarNotas.classList.add("btn-primary");
        

        document.getElementById("tablaResumenCurso").style.display = "table";
        
        seccionModificarNotas.style.display = "none";
        
        
    }
}

function anadirNota() {
    const nuevaNota = parseFloat(inputNuevaNota.value);
    

    if (isNaN(nuevaNota) || nuevaNota < 0 || nuevaNota > 10) {
        alert("Por favor, ingrese una nota válida entre 0 y 10");
        return;
    }
    
    notas.push(nuevaNota);
    
    inputNuevaNota.value = "";
    
    mostrarTabla("Todos");
    
    alert(`Nota ${nuevaNota} añadida correctamente. Total de notas: ${notas.length}`);
}


function borrarUltimaNota() {
    if (notas.length === 0) {
        alert("No hay notas para borrar");
        return;
    }
    
    const notaEliminada = notas.pop();

    mostrarTabla("Todos");

    alert(`Nota ${notaEliminada} eliminada. Total de notas restantes: ${notas.length}`);
}
