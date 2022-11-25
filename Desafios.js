//Desafio 1

class User {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return (`${this.nombre} ${this.apellido}`)
    }

    addMascota(Mascota){
        this.mascotas.push(Mascota)
    }

    countMascotas(){
        return (this.mascotas).length
    }

    addBook(Nombre, Autor){
        this.libros.push({nombre:Nombre, autor:Autor})
    }

    getBookNames(){
        return this.libros.map(libro => libro.nombre)
    }
}

const usuario = new User('Bob Esponja','Pantalones Cuadrados',[{nombre:'Romeo y Julieta', autor:'Shakespeare'},{nombre:'Don Quixote', autor:'Cervantes'}],['Caracol'])

usuario.addMascota('Gusano')
usuario.addBook('Sherlock Holmes','Poe')

console.log('Nombre del usuario: ',usuario.getFullName())
console.log('Cantidad de mascotas del usuario: ',usuario.countMascotas())
console.log('Libros del usuario: ',usuario.getBookNames())