export const pad = (number, length) => {
  // Función auxiliar para agregar ceros a la izquierda de un número
  let str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
};
