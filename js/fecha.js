document.addEventListener("DOMContentLoaded", function () {
  // Configuración inicial del calendario (Arrancamos en Febrero 2026 por tu imagen)
  let fechaActual = new Date(2026, 1); // 1 = Febrero (los meses van de 0 a 11)
  const mesesNombres = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const contenedorDias = document.getElementById("contenedor-dias");
  const mesAnioTexto = document.getElementById("mes-anio-texto");
  const textoFechaInput = document.getElementById("texto-fecha");
  const calendarioPopover = document.getElementById("calendario-popover");
  const btnContinuar = document.getElementById("btnContinuar");

  let fechaSeleccionada = ""; // Variable global 

  // Función principal para dibujar el mes
  function renderizarCalendario() {
    const mes = fechaActual.getMonth();
    const anio = fechaActual.getFullYear();

    // Actualizar el título (Ej. "Febrero, 2026")
    mesAnioTexto.innerText = `${mesesNombres[mes]}, ${anio}`;

    // Limpiar el contenedor
    contenedorDias.innerHTML = "";

    // Cálculos de días
    const primerDiaDelMes = new Date(anio, mes, 1).getDay(); // 0(Dom) a 6(Sab)
    // Ajustamos para que la semana empiece en Lunes (0) y termine en Domingo (6)
    const inicioSemana = primerDiaDelMes === 0 ? 6 : primerDiaDelMes - 1;

    const diasEnMes = new Date(anio, mes + 1, 0).getDate();
    const diasMesAnterior = new Date(anio, mes, 0).getDate();

    let htmlGrid = "";
    let diaContador = 1;
    let diaSiguienteMes = 1;

    // Crear hasta 6 filas (semanas)
    for (let i = 0; i < 6; i++) {
      htmlGrid += `<div class="row g-0 text-center mb-2">`;

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < inicioSemana) {
          // Días del mes anterior (gris tenue)
          const diaPrevio = diasMesAnterior - inicioSemana + j + 1;
          htmlGrid += `<div class="col py-1 text-muted opacity-50">${diaPrevio}</div>`;
        } else if (diaContador > diasEnMes) {
          // Días del próximo mes (gris tenue)
          htmlGrid += `<div class="col py-1 text-muted opacity-50">${diaSiguienteMes++}</div>`;
        } else {
          // Días del mes actual (clickeables)
          // Usamos clases de botones de Bootstrap para hacerlo interactivo limpiamente
          htmlGrid += `
                <div class="col">
                  <button type="button" class="btn border-0 rounded-circle text-dark p-1 w-75 fw-medium btn-dia" data-dia="${diaContador}" data-mes="${mes}" data-anio="${anio}">
                    ${diaContador}
                  </button>
                </div>`;
          diaContador++;
        }
      }
      htmlGrid += `</div>`;

      // Si ya terminamos de imprimir los días del mes, cortamos el bucle
      if (diaContador > diasEnMes) break;
    }

    contenedorDias.innerHTML = htmlGrid;
    asignarEventosDias();
  }

  // Función para darle clic a los días
  function asignarEventosDias() {
    const botonesDias = document.querySelectorAll(".btn-dia");
    botonesDias.forEach((boton) => {
      // Efecto hover sutil usando eventos de mouse y clases de Bootstrap
      boton.addEventListener("mouseenter", function () {
        this.classList.add("bg-primary", "bg-opacity-10", "text-primary");
      });
      boton.addEventListener("mouseleave", function () {
        this.classList.remove("bg-primary", "bg-opacity-10", "text-primary");
      });

      boton.addEventListener("click", function () {
        const dia = this.getAttribute("data-dia");
        const mes = this.getAttribute("data-mes");
        const anio = this.getAttribute("data-anio");

        // Actualizar el input con la fecha
        textoFechaInput.innerText = `${dia} de ${mesesNombres[mes].toLowerCase()} de ${anio}`;
        textoFechaInput.classList.replace("text-secondary", "text-dark");

        // Guardar la fecha seleccionada en la variable global
        const fechaFormateada = `${dia} de ${mesesNombres[mes].toLowerCase()} de ${anio}`;
        textoFechaInput.innerText = fechaFormateada;
        fechaSeleccionada = fechaFormateada;
        
        // Cerrar el calendario
        calendarioPopover.classList.replace("d-block", "d-none");
      });
    });
  }

  // Eventos para cambiar de mes
  document
    .getElementById("btn-prev-mes")
    .addEventListener("click", function () {
      fechaActual.setMonth(fechaActual.getMonth() - 1);
      renderizarCalendario();
    });

  document
    .getElementById("btn-next-mes")
    .addEventListener("click", function () {
      fechaActual.setMonth(fechaActual.getMonth() + 1);
      renderizarCalendario();
    });

  // Lógica de botones superiores (Igual que antes)
  const botonesFecha = document.querySelectorAll(".btn-fecha");
  const seccionCalendario = document.getElementById("seccion-calendario");
  const btnDesplegarCalendario = document.getElementById(
    "btn-desplegar-calendario",
  );

  botonesFecha.forEach((boton) => {
    boton.addEventListener("click", function () {
      botonesFecha.forEach((b) => {
        b.classList.remove("border", "border-primary", "bg-primary");
        b.classList.add("border-0", "bg-secondary");
      });
      this.classList.remove("border-0", "bg-secondary");
      this.classList.add("border", "border-primary", "bg-primary");

      if (this.id === "btn-otro") {
        seccionCalendario.classList.remove("d-none");
        if (textoFechaInput.innerText === "Escoge la fecha") {
        fechaSeleccionada = ""; 
        } else {
          fechaSeleccionada = textoFechaInput.innerText;
        }
      } else {
        seccionCalendario.classList.add("d-none");
        fechaSeleccionada = this.innerText.trim(); // Actualizar variable global con el texto del botón
      }
    });
  });

  btnDesplegarCalendario.addEventListener("click", function () {
    if (calendarioPopover.classList.contains("d-none")) {
      calendarioPopover.classList.replace("d-none", "d-block");
    } else {
      calendarioPopover.classList.replace("d-block", "d-none");
    }
  });
    // Dibujar el calendario por primera vez al cargar
  renderizarCalendario();

  btnContinuar.addEventListener("click", function () {
    // Si no se seleccionó nada, fecha por defecto o alert
    if (fechaSeleccionada === "" || fechaSeleccionada === "Selecciona una fecha") {
      Swal.fire({
          title: 'Fecha necesaria',
          text: 'Por favor, selecciona una fecha para continuar con la organización de tu sorteo.',
          icon: 'calendar', 
          confirmButtonText: 'Seleccionar fecha',
          confirmButtonColor: '#0d6efd',
          customClass: {
              popup: 'rounded-4'
          }
      });
      return;
    }

    // Guardar en localStorage
    localStorage.setItem("fechaEvento", fechaSeleccionada);
    console.log("Fecha guardada:", fechaSeleccionada);

    // Redirigir
    window.location.href = "sorteo-resumen.html";
  });
});
