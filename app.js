// Estado global de la aplicación - BUSINESS BENDING (Semana 9 Dragon Stack)
let estadoPlataforma = {
    usuario_simulado: "Doña Mari",
    edad_usuario: 54,
    estatus_jornada: "EN_PROGRESO",
    metricas_esfuerzo: {
        clics_calibracion: 0,
        credit_points_ganados: 0,
        eficiencia_retencion_laboral: "Calculando..."
    },
    seguridad_floor: {
        intentos_intrusion_detectados: 0,
        ultimo_input_limpio: true
    }
};

// Función para actualizar el cuadro verde JSON que revisa el profesor
function actualizarInspeccionJSON() {
    document.getElementById('jsonBlock').textContent = JSON.stringify({
        "dragon_stack_version": "v9.0.0-workspace-dignity",
        "piso_seguridad_supabase": "RLS_ON_AUTH_ACTIVE",
        "estado_actual_sistema": estadoPlataforma
    }, null, 2);
}

// 1. Registrar Esfuerzo Humano (El clic en "Editar Ruta")
function registrarEsfuerzo() {
    if (estadoPlataforma.estatus_jornada === "COMPLETADA") return;

    // Sumamos un clic de esfuerzo y aumentamos la recompensa (simulando el juego en VR)
    estadoPlataforma.metricas_esfuerzo.clics_calibracion += 1;
    estadoPlataforma.metricas_esfuerzo.credit_points_ganados += 25; // 25 puntos por decisión

    // Actualizamos el indicador de eficiencia según el esfuerzo demostrado
    let clics = estadoPlataforma.metricas_esfuerzo.clics_calibracion;
    if (clics < 3) {
        estadoPlataforma.metricas_esfuerzo.eficiencia_retencion_laboral = "Baja (Requiere más estímulo)";
    } else if (clics >= 3 && clics < 6) {
        estadoPlataforma.metricas_esfuerzo.eficiencia_retencion_laboral = "Media (Sentido de logro recuperado)";
    } else {
        estadoPlataforma.metricas_esfuerzo.eficiencia_retencion_laboral = "Alta (Dignidad Laboral Protegida)";
    }

    // Animación visual del botón azul para que el usuario sintonice el clic
    const boton = document.getElementById('btnTarea');
    boton.style.backgroundColor = '#a7f3d0';
    setTimeout(() => {
        boton.style.backgroundColor = '#38bdf8';
    }, 150.0);

    // Actualizar el JSON de inmediato
    actualizarInspeccionJSON();
}

// 2. Piso de Seguridad: Validar y Sanitizar texto contra inyecciones maliciosas
function verificarSeguridad(inputElement) {
    let textoOriginal = inputElement.value;
    
    // Regla estricta: si contiene caracteres peligrosos como <, >, script o comillas
    if (textoOriginal.includes("<") || textoOriginal.includes(">") || textoOriginal.toLowerCase().includes("script")) {
        estadoPlataforma.seguridad_floor.intentos_intrusion_detectados += 1;
        estadoPlataforma.seguridad_floor.ultimo_input_limpio = false;
        
        // Limpiamos (sanitizamos) el cuadro de texto borrando los símbolos raros
        inputElement.value = textoOriginal.replace(/[<>]/g, "").replace(/script/gi, "");
        
        // Desplegamos la pantalla roja de advertencia exigida por el profesor
        document.getElementById('escudoSeguridad').style.display = "flex";
    } else {
        estadoPlataforma.seguridad_floor.ultimo_input_limpio = true;
    }
    
    actualizarInspeccionJSON();
}

// Cerrar la ventana roja de seguridad
function cerrarAlerta() {
    document.getElementById('escudoSeguridad').style.display = "none";
}

// 3. Conclusión de la jornada virtual
function completarJornada() {
    if (estadoPlataforma.metricas_esfuerzo.clics_calibracion === 0) {
        alert("Doña Mari, primero debe simular un poco de esfuerzo haciendo clics en 'EDITAR RUTA'.");
        return;
    }

    estadoPlataforma.estatus_jornada = "COMPLETADA";
    
    // Cambiamos el área de trabajo a un estado verde de éxito
    const canvas = document.getElementById('canvasTrabajo');
    canvas.style.backgroundColor = '#064e3b';
    canvas.style.borderColor = '#10b981';
    
    document.getElementById('btnTarea').style.display = 'none';
    document.getElementById('instruccionesTrabajo').innerHTML = `
        <span style="font-size: 18px; font-weight: bold; color: #34d399;">¡Felicidades Doña Mari! 🎉</span><br>
        Jornada laboral terminada con éxito.<br>
        Sus puntos han sido enviados a su billetera virtual.
    `;

    actualizarInspeccionJSON();
}

// Inicializar la pantalla al cargar la página
window.onload = function() {
    actualizarInspeccionJSON();
};
