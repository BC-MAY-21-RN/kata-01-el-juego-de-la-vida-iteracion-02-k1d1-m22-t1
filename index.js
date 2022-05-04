// Clase Celula
// Atributos: Estado - Posicion en X - Posicion en Y - Limites - Cantidad de vecinos
// Metodos: Mostrar estado - Modificar estado - Mostrar posicion XY - Mostrar limites - Escuchar estado
const { Input, AutoComplete} = require('enquirer');

class Celula {
    constructor(estado, xPosition, yPosition, limites, cantVecinos) {
      this.estado = estado;
      this.xPosition = xPosition;
      this.yPosition = yPosition;
      this.limites = limites;
      this.cantVecinos = cantVecinos;
    }
  
    // Metodo de la clase que muestra el valor del estado de la celula
    getState() {
      return this.estado; //Devueleve el estado: 1- Si esta vivo 0-Si esta muerto
    }
  
    // Metodo de la clase que modifica el estado de la celula
    setState(newState) {
      this.estado = newState;
    }
  
    // Metodo de la clase que muestra la posicion en X e Y de la celula 
    getPositionXY() {
      console.log(`[ ${this.xPosition} , ${this.yPosition} ]`);
    }
  
    // Metodo de la clase que muestra los limites de la celula
    getLimits() {
      return this.limites;
    }
  
    // Metodo de la clase que evalua el valor de su estado segun la cantidad de vecinos que posea
    escuchar_estado(cantVecinos) {
      if (cantVecinos < 2 && this.estado == 1) {
        this.estado = 0;
      } else if (cantVecinos > 3 && this.estado == 1) {
        this.estado = 0;
      } else if ((cantVecinos === 3 || cantVecinos === 2) && this.estado == 1) {
        this.estado = 1;
      } else if (cantVecinos == 3 && this.estado == 0) {
        this.estado = 1;
      }else {
          console.log("El parametro obtenido no pertenece a ningun caso ");
      }
    }
  }
  
  // Clase tablero 
  // Atributos: Filas - Columnas
  // Metodos: Mostrar tablero - Generar estado aleatorio
  
  class Tablero {
    constructor(filas, columnas) {  
      this.filas = filas;
      this.columnas = columnas;
      this.estructura = new Array(filas)
        .fill(new Array(columnas).fill(0))
        .map((filas, i) =>
          filas.map((columnas, k) => new Celula(this.randomState(), i, k, 0, 0))
        );
    }
  
    // Metodo de clase que genera un estado de la celula aleatoriamente (0 => muerto , 1 => vivo)
    randomState() {
      return Math.round(Math.random());
    }
  
    // Metodo de la clase que muestra el tablero por consola
    getTablero() {
      this.estructura.forEach((fila) =>
        console.log(
          fila.map((columna) => (columna.getState() ? "*" : ".")).join("")
        )
      );
    }
  }

const askFila = new Input({
    name: 'fila',
    message: 'Ingrese la fila: '
});

const askColumnas = new Input({
  name: 'columna',
  message: 'Ingrese las columnas: '
});

const run = async () => {
  var fila  = await askFila.run()
  fila = parseInt(fila)
  var columna  = await askColumnas.run()
  columna = parseInt(columna)
  const tabla = new Tablero(fila, columna);
  tabla.getTablero();
}
  
  
run();