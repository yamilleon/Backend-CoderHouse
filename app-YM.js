//Clase constructor para el usuario
class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotas = []
    }
    //Retornamos el nombre completo
    getFullName() {
        return (this.nombre + " " + this.apellido)
    }
    //Añadimos una nueva mascota al array
    addMascota(nombreMascotas) {
        this.mascotas.push(nombreMascotas);
    }
    //Devolvemos el numero de mascotas
    countMascotas() {
        return this.mascotas.length
    }
    //Añadimos la data del libro al array de libros
    addBook(nombreLibro, autor) {
        const dataBook = { name: nombreLibro, author: autor }
        this.libros.push(dataBook)
    }
    //Devolvemos un array con el nombre de los libros
    getBookNames() {
        return this.libros.map(libro => libro.name)
    }
}
//Creamos el usuario
const usuario = new Usuario("Gordon", "Freeman")
//Traemos el nombre completo del usuario
console.log(usuario.getFullName())
//Añadimos nuevas mascotas al usuario
usuario.addMascota("Ody")
usuario.addMascota("Ziro")
usuario.addMascota("Minina")
console.log(usuario.countMascotas())
 //Añadimos algunos libros al usuario
usuario.addBook("El juramento de los Centenera", "Lydia Carreras de Sosa")
usuario.addBook("La Odisea", "Homero")
console.log(usuario.getBookNames())