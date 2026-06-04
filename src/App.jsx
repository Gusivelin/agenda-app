import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import ClienteView from "./components/ClienteView";
import AdminView from "./components/AdminView";
import "./App.css";

function App() {

  const [vista, setVista] =
    useState("cliente");

  const [reservaciones, setReservaciones] =
    useState([]);

    useEffect(() => {

  const cargarReservaciones =
    async () => {

      const {
        data,
        error
      } = await supabase
        .from("reservaciones")
        .select("*");

      if(error){

        console.error(
          "Error cargando reservaciones:",
          error
        );

        return;

      }

      // setReservaciones(data);

      console.log(data);

setReservaciones(data);

    };

  cargarReservaciones();

}, []);

  const [accesoAdmin, setAccesoAdmin] =
    useState(false);

  const [password, setPassword] =
    useState("");

  const PASSWORD_ADMIN = "VERONAYESS";
  const ingresarAdmin = () => {

    if(password === PASSWORD_ADMIN){

      setAccesoAdmin(true);
      setVista("admin");

    } else {

      alert("Contraseña incorrecta");

    }

  };

  return (

    <div>

      {/* TOPBAR */}
<div className="navbar-app">

  <div className="navbar-logo">

    <div className="logo-icon">
      🏊
    </div>

    <div>

      <h2>
        Agenda Alberca
      </h2>

      <span>
        Verona - Brescia
      </span>

    </div>

  </div>

  <div className="navbar-menu">

    <button
      className={
        vista === "cliente"
          ? "nav-btn activo"
          : "nav-btn"
      }
      onClick={() =>
        setVista("cliente")
      }
    >

      <span>
        🏠
      </span>

      <span>
        Residente
      </span>

    </button>

    <button
      className={
        vista === "admin"
          ? "nav-btn activo"
          : "nav-btn"
      }
      onClick={() => {

        if(accesoAdmin){

          setVista("admin");

        } else {

          const pass =
            prompt(
              "Ingresa contraseña"
            );

          if(
            pass === PASSWORD_ADMIN
          ){

            setAccesoAdmin(true);

            setVista("admin");

          } else {

            alert(
              "Contraseña incorrecta"
            );

          }

        }

      }}
    >

      <span>

        {accesoAdmin
          ? "👨‍💼"
          : "🔒"}

      </span>

      <span>

        {accesoAdmin
          ? "Admin"
          : "Acceso"}

      </span>

    </button>

  </div>

</div>

      {/* VISTAS */}
      {vista === "cliente" ? (

<ClienteView
  reservaciones={reservaciones}
  setReservaciones={setReservaciones}
/>

      ) : (

<AdminView
  reservaciones={reservaciones}
  setReservaciones={setReservaciones}
/>

      )}

    </div>

  );

}

export default App;