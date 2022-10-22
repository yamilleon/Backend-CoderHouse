const fs = require("fs");
class Contenedor {
  constructor(fileName) {
    this.nameFile = fileName;
  }
  async save(object) {
    let array = [];
     try {
      const data = await fs.promises.readFile(this.nameFile, "utf-8");
      array = JSON.parse(data);
      let idArray = array.map((obj) => obj.id);
      let idp = Math.max(...idArray);
      object.id = idp + 1;
      array.push(object);
      fs.writeFileSync(this.nameFile, JSON.stringify(array));
    } 
    catch {
      object.id = 0;
      array.push(object);
      fs.writeFileSync(this.nameFile, JSON.stringify(array));
    }
    return object.id;
  }
  async getById(number) {
    try {
      const data = await fs.promises.readFile(this.nameFile, "utf-08");
      let array = JSON.parse(data);
      const object = array.find(obj => obj.id === number);
      return object;
    } 
    catch {
      return null;
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.nameFile, "utf-8");
      const array = JSON.parse(data);
      return array;
    } 
    catch {
      return null;
    }
  }

  async deleteById(number) {
    try {
      data = await fs.promises.readFile(this.nameFile, "utf-8");
      const auxArray = JSON.parse(data);
      const newArray = auxArray.filter((obj) => obj.id !== number);
      fs.writeFileSync(this.nameFile, JSON.stringify(newArray));
    } catch {
      return "No hay objetos en el archivo";
    }
  }
  deleteAll() {
    fs.writeFileSync(this.nameFile, "");
  }
}
const newArchivo = new Contenedor("./test.txt");
newArchivo
  .save({ title: "La Vaca lola", price: 100000, thumbnail: "vaca.png" })
  .then((resolve) => console.log(resolve));
newArchivo.getById().then((resolve) => console.log(resolve));
newArchivo.getAll().then((resolve) => console.log(resolve));
newArchivo.deleteById(2);
newArchivo.deleteAll();
