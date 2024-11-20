import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // Agrega el token como encabezado Authorization
      },
    });
  }
  return next(authReq).pipe(
    catchError((error) => {
      if (
        (error.status === 401 && error.error?.message === 'jwt expired') ||
        error.error?.message === 'No autorizado'
      ) {
        // Manejar el token expirado
        console.error('El token ha expirado. redireccionando al login');
        // Ejemplo: Redirigir al login o intentar renovar el token
        handleTokenExpiration();
      }

      // Propagar el error para que otros manejadores lo capturen si es necesario
      throw error;
    })
  );
};

function handleTokenExpiration() {
  console.log('Funcion para manejar expiracion del token');
  window.location.href = '/';
  // Elimina el token
  // localStorage.removeItem('access_token');
  // Redirige al usuario al inicio de sesión
  // window.location.href = '/login';
}
