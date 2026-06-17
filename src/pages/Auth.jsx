import { useState } from "react";

export default function Auth() {
  // estilos
  const inputTextClass = "border rounded-xs min-w-90 min-h-10 p-3 mb-5";
  const divClass = "flex flex-col gap-2 text-text-secondary";

  // Iniciar sesion o crear cuenta?

  const [loginPage, setLoginPage] = useState(true);
  return (
    <>
      {loginPage ? (
        // LOGIN
        <div className="flex flex-col items-center min-h-dvh justify-center relative">
          <form className="flex flex-col items-center border rounded-md p-5">
            <h2 className="text-3xl mb-6 font-titulo font-medium tracking-widest">
              INICIAR SESIÓN
            </h2>
            <div className={divClass}>
              <label className="text-text-secondary">Email</label>
              <input
                type="email"
                name="email"
                id=""
                className={inputTextClass}
                placeholder="correo@ejemplo.com.ar"
                required
              />
            </div>
            <div className={divClass}>
              <label>Contraseña</label>
              <input
                type="password"
                className={inputTextClass}
                placeholder="********"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-5 bg-accent-primary w-full py-3 rounded-xs hover:bg-amber-200 hover:text-text-secondary transition-colors duration-200 cursor-pointer"
            >
              INGRESAR
            </button>
            <a onClick={()=>setLoginPage(false)}>quieres crear cuenta</a>
          </form>
        </div>
      ) : (
        // SIGN UP
        <h2>CREAR CUENTA</h2>
      )}
    </>
  );
}
