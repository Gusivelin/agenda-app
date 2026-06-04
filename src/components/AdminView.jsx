import { useState } from "react";
import { supabase } from "../supabase";

function AdminView({

  reservaciones,
  setReservaciones

}) {

  const [imagenGrande, setImagenGrande] =
    useState(null);

const aprobarReservacion = async (id) => {

  const { error } =
    await supabase
      .from("reservaciones")
      .update({
        estado: "aprobado"
      })
      .eq("id", id);

  if(error){

    console.error(error);

    alert("Error al aprobar");

    return;

  }

  setReservaciones(

    reservaciones.map((r) =>

      r.id === id

        ? {
            ...r,
            estado: "aprobado"
          }

        : r

    )

  );

};

const rechazarReservacion = async (id) => {

  const { error } =
    await supabase
      .from("reservaciones")
      .update({
        estado: "rechazado"
      })
      .eq("id", id);

  if(error){

    console.error(error);

    alert("Error al rechazar");

    return;

  }

  setReservaciones(

    reservaciones.map((r) =>

      r.id === id

        ? {
            ...r,
            estado: "rechazado"
          }

        : r

    )

  );

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
                  📅 {r.fechareservada}
                </span>

                <span>
                  ⏰ {r.horario}
                </span>

                <span>
                  📝 {r.fecharegistro}
                </span>

                <span>
                  🕒 {r.horaregistro}
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

{r.comprobante_url && (

  <img
    src={r.comprobante_url}
    alt="Comprobante"
    className="comprobante"

    onClick={() =>
      setImagenGrande(
        r.comprobante_url
      )
    }
  />

)}

              <div className="acciones">

                <button
                  className="btn-aprobar"

onClick={() =>
  aprobarReservacion(r.id)
}
                >
                  Aprobar
                </button>

                <button
                  className="btn-rechazar"

onClick={() =>
  rechazarReservacion(r.id)
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