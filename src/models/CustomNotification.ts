// CustomNotification.ts
class CustomNotification extends Error {
    code: number;
    data?: any;
    
    constructor(message: string, code: number, data?: any) {
      super(message);
      this.code = code;
      this.data = data;
      Object.setPrototypeOf(this, CustomNotification.prototype);
    }
    
    // Agregar un método para mostrar notificaciones
    showNotification(snackbar: any) {
  
      const variant = this.getVariant();
  
      snackbar(this.message, {
        variant: variant,
        data: this.data,
        autoHideDuration: 4000
      });
    }
  
    getVariant() {
  
  
      const numeroComoTexto = this.code.toString(); // Convierte el número a una cadena
      const primerDigito = numeroComoTexto.charAt(0); 
  
      switch (primerDigito) {
        case "2": // Por ejemplo, para el código 200
          return "success";
        case "3": // Por ejemplo, para el código 300
          return "info";
        case "4": // Por ejemplo, para el código 400
          return "warning"; 
        case "5": // Por ejemplo, para el código 500
          return "error"; 
        default:
          return "default"; // Valor predeterminado
      }
    }
  
  }
  
  export default CustomNotification;