

export default function initApp() {


  if (typeof window !== "undefined") {

    const channel = new BroadcastChannel('app_channel');

    window.localStorage.openpages = Date.now();

    var onLocalStorageEvent = function (e) {
      console.log(e.key);
      if (e.key === "openpages") {
        // Emit that you're already available.
        localStorage.page_available = Date.now();
      }
      if (e.key === "page_available") {
        alert("La Aplicacion ya se Encuentra Abierta en otra pestaña.");
        // const channel = new BroadcastChannel('app_channel');
        // channel.postMessage('CLOSE_APP');
        // channel.close();
      }
    };

    const handleBeforeUnload = (event) => {
      // Mensaje de advertencia (puede ser ignorado por navegadores modernos)
      const message = "¿Estás seguro de que deseas salir?";
      event.returnValue = message; // Para los navegadores modernos
      return message; // Para navegadores más antiguos
    };

    const handleUnload = async () => {
      try {
        // Realizar una solicitud para cerrar la sesión
        window.localStorage.clear();
        channel.postMessage('CLOSE_APP');
        channel.close();
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };





    window.addEventListener("storage", onLocalStorageEvent, false);

    window.addEventListener("error", (event) => {
      console.error("Error no controlado:", event.error);
    });


    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);


    channel.addEventListener('message', (event) => {
      if (event.data === 'CLOSE_APP') {
        window.close();
      }
    });

    // Limpieza al desmontar el componente


  }

}
