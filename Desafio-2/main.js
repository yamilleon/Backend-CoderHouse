const fs = require('fs');
const express = require('express');
class Contenedor {
  constructor(fileName) {
    this.nameFile = fileName;
  }
  async save(object) {
    let array = [];
     try {
      const data = await fs.promises.readFile(this.nameFile, "utf-8");
      array = JSON.parse(data);
      let idArray = array.map(obj => obj.id);
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
const newArchivo = new Contenedor("./productos.txt");
const app = express();

const PORT = 8080

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})


server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.end("Bienvenidos")
})
app.get('/productos', (req, res) => {
    newArchivo.getAll().then(resolve => {
        res.end(`todo los productos: ${JSON.stringify(resolve)}`)
    });

})
app.get('/productosRandom', (req, res) => {
    let aleaTorio = parseInt((Math.random() * 4) + 1)
    newArchivo.getById(aleaTorio).then(resolve => {
        res.end(`producto random: ${JSON.stringify(resolve)}`)
    });
})