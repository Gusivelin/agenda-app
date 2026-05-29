
import { useState } from "react";

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

    setFormulario({

      ...formulario,

      [e.target.name]:
        e.target.value

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

const reservar = (e) => {

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

  const existe = reservaciones.find(
    (r) =>

      r.fechaReservada ===
      formulario.fechaReservada &&

      r.horario ===
      formulario.horario &&

      r.estado === "aprobado"
  );

  if(existe){

    alert(
      "Ese horario ya fue aprobado"
    );

    return;

  }

  const ahora = new Date();

  const nuevaReservacion = {

    ...formulario,

    estado:"pendiente",

    fechaRegistro:
      ahora.toLocaleDateString(),

    horaRegistro:
      ahora.toLocaleTimeString()

  };

  setReservaciones([
    ...reservaciones,
    nuevaReservacion
  ]);

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

  return (

    <div className="contenedor">

      {/* FORMULARIO */}

      <div className="card">

        <h1>
          Apartado Alberca
        </h1>

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
                Selecciona
              </option>

              <option>
                10:00 AM
              </option>

              <option>
                02:00 PM
              </option>

              <option>
                06:00 PM
              </option>

            </select>

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

<div className="calendario">

  {Array.from(
    { length: 31 },
    (_, i) => {

    const dia = i + 1;

    /* MAÑANA */

    const reservaManana =
      reservaciones.find((r) => {

      const diaReservado =
        Number(
          r.fechaReservada
          .split("-")[2]
        );

      return (

        diaReservado === dia &&

        r.horario === "10:00 AM" &&

        r.estado === "aprobado"

      );

    });

    /* TARDE */

    const reservaTarde =
      reservaciones.find((r) => {

      const diaReservado =
        Number(
          r.fechaReservada
          .split("-")[2]
        );

      return (

        diaReservado === dia &&

        r.horario === "02:00 PM" &&

        r.estado === "aprobado"

      );

    });

    /* NOCHE */

    const reservaNoche =
      reservaciones.find((r) => {

      const diaReservado =
        Number(
          r.fechaReservada
          .split("-")[2]
        );

      return (

        diaReservado === dia &&

        r.horario === "06:00 PM" &&

        r.estado === "aprobado"

      );

    });

    return(

      <div
        key={dia}
        className="dia-card"
      >

        <div className="numero-dia">
          {dia}
        </div>

        <div className="horarios-dia">

          {/* MAÑANA */}

          <div className="slot-wrapper">

            <div
              className={
                reservaManana
                ? "slot ocupado-manana"
                : "slot"
              }
            />

            {reservaManana && (

              <div className="tooltip">

                <strong>
                  10:00 AM
                </strong>

                <span>
                  {reservaManana.domicilio}
                </span>

              </div>

            )}

          </div>

          {/* TARDE */}

          <div className="slot-wrapper">

            <div
              className={
                reservaTarde
                ? "slot ocupado-tarde"
                : "slot"
              }
            />

            {reservaTarde && (

              <div className="tooltip">

                <strong>
                  02:00 PM
                </strong>

                <span>
                  {reservaTarde.domicilio}
                </span>

              </div>

            )}

          </div>

          {/* NOCHE */}

          <div className="slot-wrapper">

            <div
              className={
                reservaNoche
                ? "slot ocupado-noche"
                : "slot"
              }
            />

            {reservaNoche && (

              <div className="tooltip">

                <strong>
                  06:00 PM
                </strong>

                <span>
                  {reservaNoche.domicilio}
                </span>

              </div>

            )}

          </div>

        </div>

      </div>

    );

  })}

</div>

      </div>

    </div>

  );

}

export default ClienteView;
