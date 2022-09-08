const fs = require('fs')

class Contenedor {

    constructor(archivo) {
        try {
            this.archivo = archivo
            this.productos = JSON.parse(fs.promises.readFile(archivo, 'utf-8'))
        }

        catch (error) {
            fs.promises.writeFile(archivo, JSON.stringify([]))
            this.productos = []
        }

    }

    save(producto) {

        let id = this.productos.length > 0 ? this.productos[this.productos.length - 1].id + 1 : 1;
        producto.id = id;
        this.productos.push(producto);

        return fs.promises.writeFile(this.archivo, JSON.stringify(this.productos))
            .then()
            .catch(error => console.log(error))

    }

    getById(IDnumber) {
        const productById = this.productos.find(producto => producto.id == IDnumber)
        if (productById) {
            return productById
        } else {
            console.log('No existe producto')
            return null
        }
    }

    getAll() {

        return this.productos
    }

    deleteById(IDnumber) {
        const productosExistentes = this.productos.filter(producto => producto.id !== IDnumber)
        if (productosExistentes) {
            fs.promises.writeFile(this.archivo, JSON.stringify(productosExistentes))
                .then(() => console.log(this.productos))
        }
    }

    deleteAll() {

        return fs.promises.writeFile(this.archivo, JSON.stringify([]))
            .then(() => console.log('Borrado exitoso'))
            .catch(error => console.log(error))
    }

    productoRandom() {

        let numRandom = Math.ceil(Math.random() * 3)
        return this.getById(numRandom)

    }
}


const productos = new Contenedor('./productos.txt');

productos.save({
    title: 'A',
    price: 100,
    thumbnail: 'https://abc.png',
});
productos.save({
    title: 'B',
    price: 200,
    thumbnail: 'https://def.png',
});
productos.save({
    title: 'C',
    price: 300,
    thumbnail: 'https://fgh.png',
});

module.exports = productos
// console.log(contenedor.getById(2));

// console.log(contenedor.deleteById(2));

// console.log(contenedor.getById(2));

// console.log(contenedor.deleteAll());

// console.log(contenedor.getAll());