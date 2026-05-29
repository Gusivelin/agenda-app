import { useState } from "react";

import ClienteView from "./components/ClienteView";
import AdminView from "./components/AdminView";

import "./App.css";

function App() {

  const [vista, setVista] =
    useState("cliente");

  const [reservaciones, setReservaciones] =
    useState([]);

  const [accesoAdmin, setAccesoAdmin] =
    useState(false);

  const [password, setPassword] =
    useState("");

  /* CONTRASEÑA */

  const PASSWORD_ADMIN = "VERONAYESS";

  const ingresarAdmin = () => {

    if(password === PASSWORD_ADMIN){

      setAccesoAdmin(true);

      setVista("admin");

    }else{

      alert(
        "Contraseña incorrecta"
      );

    }

  };

  return (

    <div>

      {/* TOPBAR */}

      <div className="topbar">

        <button
          onClick={() => {

            setVista("cliente");

          }}
        >
          Vista Residente
        </button>

        <button
          onClick={() => {

            if(accesoAdmin){

              setVista("admin");

            }else{

              const pass =
                prompt(
                  "Ingresa contraseña"
                );

              if(pass === PASSWORD_ADMIN){

                setAccesoAdmin(true);

                setVista("admin");

              }else{

                alert(
                  "Contraseña incorrecta"
                );

              }

            }

          }}
        >
          Vista Administración
        </button>

      </div>

      {/* VISTAS */}

      {vista === "cliente" ? (

        <ClienteView
          reservaciones={reservaciones}
          setReservaciones={
            setReservaciones
          }
        />

      ) : (

        <AdminView
          reservaciones={reservaciones}
          setReservaciones={
            setReservaciones
          }
        />

      )}

    </div>

  );

}

export default App;

