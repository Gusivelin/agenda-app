import { useState } from "react";
import { supabase }
from "../supabase";
function ClienteView({

  reservaciones,
  setReservaciones

}) {

const domicilios = [

  /* VERONA */

  "Verona 100",

  "Verona 101A",
  "Verona 101B",
  "Verona 101C",

  "Verona 102A",
  "Verona 102B",

  "Verona 103A",
  "Verona 103B",

  "Verona 104A",
  "Verona 104B",

  "Verona 105A",
  "Verona 105B",

  "Verona 106A",
  "Verona 106B",

  "Verona 107A",
  "Verona 107B",

  "Verona 108A",
  "Verona 108B",

  "Verona 110A",
  "Verona 110B",

  /* BRESCIA */

  "Brescia 102A",
  "Brescia 102B",

  "Brescia 104A",
  "Brescia 104B",

  "Brescia 106A",
  "Brescia 106B",

  "Brescia 108A",
  "Brescia 108B",

  "Brescia 110A",
  "Brescia 110B",

  "Brescia 200",

  "Brescia 201A",
  "Brescia 201B",

  "Brescia 202A",
  "Brescia 202B",

  "Brescia 203A",
  "Brescia 203B",

  "Brescia 204A",
  "Brescia 204B",

  "Brescia 206A",
  "Brescia 206B",

  "Brescia 208A",
  "Brescia 208B",

  "Brescia 210A",
  "Brescia 210B",

  "Brescia 212A",
  "Brescia 212B",

  "Brescia 214A",
  "Brescia 214B",

  "Brescia 216A",
  "Brescia 216B",

  "Brescia 218A",
  "Brescia 218B",

  "Brescia 220A",
  "Brescia 220B",

  "Brescia 222A",
  "Brescia 222B",

  "Brescia 300A",
  "Brescia 300B",

  "Brescia 301",

  "Brescia 302A",
  "Brescia 302B",

  "Brescia 303A",
  "Brescia 303B",

  "Brescia 304A",
  "Brescia 304B",

  "Brescia 306A",
  "Brescia 306B",

  "Brescia 308A",
  "Brescia 308B",

  "Brescia 310A",
  "Brescia 310B",

  "Brescia 400",

  "Brescia 401A",
  "Brescia 401B",

  "Brescia 402A",
  "Brescia 402B",

  "Brescia 403A",
  "Brescia 403B",

  "Brescia 404A",
  "Brescia 404B",

  "Brescia 405A",
  "Brescia 405B",

  "Brescia 406A",
  "Brescia 406B",

  "Brescia 407A",
  "Brescia 407B",

  "Brescia 408A",
  "Brescia 408B",

  "Brescia 410A",
  "Brescia 410B",

  "Brescia 412A",
  "Brescia 412B"

];

  const [formulario, setFormulario] =
    useState({

      domicilio: "",
      fechaReservada: "",
      horario: "",
      comprobante: null,
      preview: ""

    });

const handleChange = (e) => {

  const { name, value } =
    e.target;

  if(name === "fechaReservada"){

    setFormulario({

      ...formulario,

      fechaReservada: value,

      horario: ""

    });

    return;

  }

  setFormulario({

    ...formulario,

    [name]: value

  });

};

  const handleImage = (e) => {

    const file = e.target.files[0];

    if(file){

      setFormulario({

        ...formulario,

        comprobante:file,

        preview:
          URL.createObjectURL(file)

      });

    }

  };

const reservar = async (e) => {

  e.preventDefault();

  /* VALIDAR CAMPOS */

  if(

    !formulario.domicilio ||
    !formulario.fechaReservada ||
    !formulario.horario ||
    !formulario.comprobante

  ){

    alert(
      "Completa todos los campos"
    );

    return;

  }

const existe =
  reservaciones.find(

    (r) =>

      r.fechareservada ===
      formulario.fechaReservada &&

      r.horario ===
      formulario.horario &&

      (
        r.estado === "aprobado" ||
        r.estado === "pendiente"
      )

  );

  if(existe){

alert(
  "Ese horario ya tiene una solicitud registrada"
);

    return;

  }

const reservasDomicilio =
  reservaciones.filter((r) =>

    r.domicilio ===
      formulario.domicilio &&

    (
      r.estado === "pendiente" ||
      r.estado === "aprobado"
    )

  );

const entreSemana =
  reservasDomicilio.filter((r) => {

    const fecha =
      new Date(
        r.fechareservada +
        "T00:00:00"
      );

    const dia =
      fecha.getDay();

    return (
      dia >= 1 &&
      dia <= 4
    );

  }).length;

const finSemana =
  reservasDomicilio.filter((r) => {

    const fecha =
      new Date(
        r.fechareservada +
        "T00:00:00"
      );

    const dia =
      fecha.getDay();

    return (
      dia === 5 ||
      dia === 6 ||
      dia === 0
    );

  }).length;

  const nuevaEsFinSemana =
  esFinDeSemana(
    formulario.fechaReservada
  );

if (

  nuevaEsFinSemana &&

  finSemana >=
    LIMITE_FIN_SEMANA

){

  alert(

    "Este domicilio ya utilizó sus " +

    LIMITE_FIN_SEMANA +

    " reservaciones de fin de semana."

  );

  return;

}

if (

  !nuevaEsFinSemana &&

  entreSemana >=
    LIMITE_ENTRE_SEMANA

){

  alert(

    "Este domicilio ya utilizó sus " +

    LIMITE_ENTRE_SEMANA +

    " reservaciones entre semana."

  );

  return;

}

  const ahora = new Date();

const nombreArchivo =
  Date.now() +
  "_" +
  formulario.comprobante.name;

const { error: errorImagen } =
  await supabase.storage
    .from("comprobantes")
    .upload(
      nombreArchivo,
      formulario.comprobante
    );

if(errorImagen){

  console.error(errorImagen);

  alert(
    "Error al subir imagen"
  );

  return;

}

const { data: urlData } =
  supabase.storage
    .from("comprobantes")
    .getPublicUrl(
      nombreArchivo
    );

const urlImagen =
  urlData.publicUrl;

const { data, error } =
  await supabase
    .from("reservaciones")
    .insert([
      {
        domicilio:
          formulario.domicilio,

        fechareservada:
          formulario.fechaReservada,

        horario:
          formulario.horario,

        comprobante_url:
          urlImagen,

        estado:
          "pendiente",

        fecharegistro:
          new Date()
            .toLocaleDateString(),

        horaregistro:
          new Date()
            .toLocaleTimeString()
      }
    ]);

console.log("DATA:", data);
console.log(
  "ERROR COMPLETO:",
  JSON.stringify(error, null, 2)
);
  
alert(
  "Solicitud enviada"
);

setFormulario({
  domicilio:"",
  fechaReservada:"",
  horario:"",
  comprobante:null,
  preview:""
});

};

const [fechaCalendario, setFechaCalendario] =
  useState(new Date());

const mes =
  fechaCalendario.getMonth();

const anio =
  fechaCalendario.getFullYear();

const primerDiaMes =
  new Date(anio, mes, 1);

let inicioSemana =
  primerDiaMes.getDay();

inicioSemana =
  inicioSemana === 0
    ? 6
    : inicioSemana - 1;

const diasMes =
  new Date(
    anio,
    mes + 1,
    0
  ).getDate();

const nombreMes =
  fechaCalendario.toLocaleString(
    "es-MX",
    { month: "long" }
  );

const obtenerClaseEstado = (reserva) => {

  if(!reserva){

    return "slot";

  }

  switch(reserva.estado){

    case "pendiente":
      return "slot pendiente";

    case "aprobado":
      return "slot aprobado";

    case "rechazado":
      return "slot rechazado";

    default:
      return "slot";

  }

};

 const obtenerHorarios = () => {

  if(!formulario.fechaReservada){

    return [];

  }

  const dia =
    new Date(
      formulario.fechaReservada +
      "T00:00:00"
    ).getDay();

  const esFinSemana =

    dia === 5 ||
    dia === 6 ||
    dia === 0;

  if(esFinSemana){

    return [

      "09:00 AM - 03:00 PM",

      "03:30 PM - 09:30 PM"

    ];

  }

  return [

    "08:00 AM - 12:30 PM",

    "01:00 PM - 05:30 PM",

    "06:00 PM - 10:00 PM"

  ];

};



const reservasActuales =
  reservaciones.filter((r) =>

    r.domicilio ===
      formulario.domicilio &&

    (
      r.estado === "pendiente" ||
      r.estado === "aprobado"
    )

  );

const usadasEntreSemana =
  reservasActuales.filter((r) => {

    const dia =
      new Date(
        r.fechareservada +
        "T00:00:00"
      ).getDay();

    return (
      dia >= 1 &&
      dia <= 4
    );

  }).length;

const usadasFinSemana =
  reservasActuales.filter((r) => {

    const dia =
      new Date(
        r.fechareservada +
        "T00:00:00"
      ).getDay();

    return (
      dia === 5 ||
      dia === 6 ||
      dia === 0
    );

  }).length;

const LIMITE_ENTRE_SEMANA = 3;

const LIMITE_FIN_SEMANA = 2;

const esFinDeSemana = (fecha) => {

  const dia =
    new Date(
      fecha + "T00:00:00"
    ).getDay();

  return (
    dia === 5 || // Viernes
    dia === 6 || // Sábado
    dia === 0    // Domingo
  );

};

const obtenerHorariosDisponibles = () => {

  const horarios =
    obtenerHorarios();

  if(!formulario.fechaReservada){

    return horarios;

  }

  return horarios.filter(
    (horario) => {

      const ocupado =
        reservaciones.some((r) =>

          r.fechareservada ===
            formulario.fechaReservada &&

          r.horario ===
            horario &&

          (
            r.estado === "pendiente" ||
            r.estado === "aprobado"
          )

        );

      return !ocupado;

    }
  );

};



  return (

    <div className="contenedor">

      {/* FORMULARIO */}

      <div className="card">

<div className="hero">

  <h1>
    Sistema de Reservación
  </h1>

  <p>
    Área de Alberca
  </p>

  <span>
    Condominio Verona - Brescia
  </span>

</div>

<p className="subtitulo">
  Selecciona fecha y horario
  para realizar tu solicitud.
</p>

        <form onSubmit={reservar}>

          <div className="input-group">

            <label>
              Domicilio
            </label>

            <select
              name="domicilio"
              value={formulario.domicilio}
              onChange={handleChange}
              required
            >  

              <option value="">
                Selecciona
              </option>

              {domicilios.map((d) => (

                <option
                  key={d}
                  value={d}
                >
                  {d}
                </option>

              ))}

            </select>

                         {formulario.domicilio && (

  <div className="disponibilidad">

    <p>

      Entre semana:

      {" "}

      {
        LIMITE_ENTRE_SEMANA -
        usadasEntreSemana
      }

      {" / "}

      {LIMITE_ENTRE_SEMANA}

    </p>

    <p>

      Fin de semana:

      {" "}

      {
        LIMITE_FIN_SEMANA -
        usadasFinSemana
      }

      {" / "}

      {LIMITE_FIN_SEMANA}

    </p>

  </div>

)} 

          </div>

          <div className="input-group">

            <label>
              Fecha
            </label>

<input
  type="date"
  name="fechaReservada"
  value={
    formulario.fechaReservada
  }
  onChange={handleChange}
  min={
    new Date()
      .toISOString()
      .split("T")[0]
  }
  required
/>

          </div>

          <div className="input-group">

            <label>
              Horario
            </label>

<select
  name="horario"
  value={formulario.horario}
  onChange={handleChange}
  required
>

  <option value="">
    Selecciona horario
  </option>

{obtenerHorariosDisponibles().map(
  (horario) => (

      <option
        key={horario}
        value={horario}
      >
        {horario}
      </option>

    )
  )}

</select>

{formulario.fechaReservada &&
 obtenerHorariosDisponibles().length === 0 && (

  <div className="sin-horarios">

    No hay horarios disponibles
    para esta fecha.

  </div>

)}

          </div>

          <div className="input-group">

            <label>
              Comprobante
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              required
            />

          </div>

          {formulario.preview && (

            <div
              className="preview-container"
            >

              <img
                src={formulario.preview}
                alt=""
                className="preview"
              />

              <div className="preview-info">

                <p>
                  Comprobante cargado
                </p>

                <span>
                  Imagen lista
                </span>

              </div>

            </div>

          )}

          <button type="submit">
            Enviar Solicitud
          </button>

        </form>

      </div>

      {/* CALENDARIO */}

      <div className="card">

        <h2>
          Agenda Alberca
        </h2>

<div className="leyenda">

  <div>
    <span className="color pendiente"></span>
    Pendiente
  </div>

  <div>
    <span className="color aprobado"></span>
    Aprobado
  </div>

  <div>
    <span className="color rechazado"></span>
    Rechazado
  </div>

</div>

<div className="mes-header">

  <button
    className="btn-mes"
    onClick={() => {

      const nuevaFecha =
        new Date(
          anio,
          mes - 1,
          1
        );

      setFechaCalendario(
        nuevaFecha
      );

    }}
  >
    ◀
  </button>

  <h3>

    {nombreMes.charAt(0)
      .toUpperCase() +
      nombreMes.slice(1)}

    {" "}

    {anio}

  </h3>

  <button
    className="btn-mes"
    onClick={() => {

      const nuevaFecha =
        new Date(
          anio,
          mes + 1,
          1
        );

      setFechaCalendario(
        nuevaFecha
      );

    }}
  >
    ▶
  </button>

</div>

<div className="dias-semana">

  <div>L</div>
  <div>M</div>
  <div>M</div>
  <div>J</div>
  <div>V</div>
  <div>S</div>
  <div>D</div>

</div>

<div className="calendario">

  {Array.from(
    {
      length:
        inicioSemana +
        diasMes
    },
    (_, i) => {

      if(i < inicioSemana){

        return (

<div
  key={`vacio-${anio}-${mes}-${i}`}
  className="dia-vacio"
/>

        );

      }

      const dia =
        i - inicioSemana + 1;

    return(

<div
  key={`${anio}-${mes}-${dia}`}
  className="dia-card"
>
<div className="numero-dia">

  {dia}

  <span className="contador-dia">

    {(() => {

      const fechaActual =
        new Date(
          anio,
          mes,
          dia
        );

      const diaSemana =
        fechaActual.getDay();

      const totalHorarios =

        diaSemana === 5 ||
        diaSemana === 6 ||
        diaSemana === 0

          ? 2
          : 3;

      const ocupados =
        reservaciones.filter((r) => {

          const fechaReserva =
            new Date(
              r.fechareservada +
              "T00:00:00"
            );

          return (

            fechaReserva.getDate() === dia &&

            fechaReserva.getMonth() === mes &&

            fechaReserva.getFullYear() === anio &&

            (
              r.estado === "pendiente" ||
              r.estado === "aprobado"
            )

          );

        }).length;

      return `${ocupados}/${totalHorarios}`;

    })()}

  </span>

</div>

<div className="horarios-dia">

  {(() => {

    const fechaActual =
      new Date(
        anio,
        mes,
        dia
      );

    const diaSemana =
      fechaActual.getDay();

    const horariosDia =

      diaSemana === 5 ||
      diaSemana === 6 ||
      diaSemana === 0

        ? [

            "09:00 AM - 03:00 PM",

            "03:30 PM - 09:30 PM"

          ]

        : [

            "08:00 AM - 12:30 PM",

            "01:00 PM - 05:30 PM",

            "06:00 PM - 10:00 PM"

          ];

    return horariosDia.map(
      (horario) => {

        const reserva =
reservaciones.find((r) => {

  const fechaReserva =
    new Date(
      r.fechareservada +
      "T00:00:00"
    );

  return (
    fechaReserva.getDate() === dia &&
    fechaReserva.getMonth() === mes &&
    fechaReserva.getFullYear() === anio &&
    r.horario === horario
  );

});

        return (

          <div
            key={horario}
            className="slot-wrapper"
          >

            <div
              className={
                obtenerClaseEstado(
                  reserva
                )
              }
            />

            {reserva && (

              <div className="tooltip">

                <strong>
                  {reserva.domicilio}
                </strong>

                <span>
                  {reserva.horario}
                </span>

                <span>

                  Estado:

                  {" "}

                  {reserva.estado}

                </span>

              </div>

            )}

          </div>

        );

      }

    );

  })()}

</div>

      </div>

    );

    }
)}

</div>

      </div>

    </div>

  );

}

export default ClienteView;