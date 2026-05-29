import { useState } from "react";

function AdminView({

  reservaciones,
  setReservaciones

}) {

  const [imagenGrande, setImagenGrande] =
    useState(null);

  const aprobarReservacion = (index) => {

    const nuevas =
      [...reservaciones];

    nuevas[index].estado =
      "aprobado";

    setReservaciones(nuevas);

  };

  const rechazarReservacion = (index) => {

    const nuevas =
      [...reservaciones];

    nuevas[index].estado =
      "rechazado";

    setReservaciones(nuevas);

  };

  return (

    <div className="contenedor-admin">

      <div className="card">

        <h1>
          Panel Administración
        </h1>

        <div className="lista-reservaciones">

          {reservaciones.map((r,index)=>(

            <div
              key={index}
              className="reservacion"
            >

              <strong>
                {r.domicilio}
              </strong>

              <div className="info">

                <span>
                  📅 {r.fechaReservada}
                </span>

                <span>
                  ⏰ {r.horario}
                </span>

                <span>
                  📝 {r.fechaRegistro}
                </span>

                <span>
                  🕒 {r.horaRegistro}
                </span>

              </div>

              <div
                className={
                  r.estado === "aprobado"
                  ? "estado aprobado"

                  : r.estado === "rechazado"

                  ? "estado rechazado"

                  : "estado pendiente"
                }
              >

                {r.estado}

              </div>

              {r.preview && (

                <img
                  src={r.preview}
                  alt=""
                  className="comprobante"

                  onClick={() =>
                    setImagenGrande(
                      r.preview
                    )
                  }
                />

              )}

              <div className="acciones">

                <button
                  className="btn-aprobar"

                  onClick={() =>
                    aprobarReservacion(index)
                  }
                >
                  Aprobar
                </button>

                <button
                  className="btn-rechazar"

                  onClick={() =>
                    rechazarReservacion(index)
                  }
                >
                  Rechazar
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {imagenGrande && (

        <div
          className="modal"

          onClick={() =>
            setImagenGrande(null)
          }
        >

          <img
            src={imagenGrande}
            alt=""
            className="imagen-modal"
          />

        </div>

      )}

    </div>

  );

}

export default AdminView;