import { useAuth } from "../../context/AuthContext";

export default function Dash(){
    const {Logout} = useAuth();
    return(<section>
        <button onClick={Logout}>
            Cerrar Sesion
        </button>
    </section>)
}