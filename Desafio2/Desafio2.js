const fs = require ('fs')

class Contenedor {

  constructor( archivo ) {
    this.archivo = archivo
  }

  async getAll(){
    try {
      const objects = await fs.promises.readFile (this.archivo, 'utf-8')
      return JSON.parse(objects)
    }
    catch (err) {
      console.log ('Error de lectura!',err)
    }
  }
  async saveFile(archivo, objects){
    try {
      await fs.promises.writeFile (archivo,JSON.stringify( objects, null, 2))
    }
    catch (err) {
      console.log ('Error de lectura!',err)
    }
  }

  async save (Object) {
    const objects = await this.getAll()
    try {
      let newId 
      objects.length === 0  ? newId = 1  : newId = objects[objects.length - 1].id + 1

      const newObject = {id: newId, ...Object}
      objects.push (newObject)
      await this.saveFile (this.archivo, objects)
      
      return newId
    }
    catch (err) {
      console.log ('Error de lectura!',err)
    }
  }

  async getById( id ) {
    const objects = await this.getAll()
    try {
      const object = objects.find( e => e.id === id)
      return object ? object : null

    } 
    catch (err) {
      console.log ('Error de lectura!',err)
    }
  }

  async deleteById( id ) {
    let objects = await this.getAll()
    
    try {
      objects = objects.filter( e => e.id != id )
      await this.saveFile( this.archivo, objects)
    
    } 
    catch (err) {
      console.log ('Error de lectura!',err)
    }
  }


  async deleteAll() {
    await this.saveFile(this.archivo, [])
  }
}

/****** Pruebas ******/

const productos = new Contenedor('productos.txt')

const prueba = async() => {
  try {
    
    let archivo = await productos.getAll()
    console.log(archivo)


    await productos.save(
      { "title": "Lápiz",
        "price": 111,
        "thumbnail": "url4"
      }
    )
    archivo = await productos.getAll()
    console.log(archivo)


    let idResp = await productos.getById(1)
    console.log(idResp)
    

    await productos.deleteById(2)
    archivo = await productos.getAll()
    console.log(archivo)


    await productos.deleteAll()
    archivo = await productos.getAll()
    console.log(archivo)


  } 
  catch (err) {
    console.log ('Error de lectura!',err)
  }
}

prueba()