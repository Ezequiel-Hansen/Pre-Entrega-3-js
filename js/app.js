//Elementos
const divProd=document.querySelector(".row");
const divCarrito=document.querySelector(".main__card");
const prodTot=document.querySelector(".totalProductos");
const botonCarrito=document.querySelector("#boton-de-compra--carrito");
//Molde para los productos
class Productos{
    constructor(id,nombre,precio,imagen){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.imagen=imagen;
    }
}
//Base de datos
class BD{
    constructor(){
        this.productos=[]
        this.agregarRegistro(1,"Set de 3 Bandas elasticas",3500,"/img/conoces-mini-bandas-resistencia-entrenamiento.jpg");
        this.agregarRegistro(2,"Set de 5 bandas de resistencia",5500,"/img/POWER_BANDS_Bandas_El_sticas_de_Resistencia_12.jpg");
        this.agregarRegistro(3,"Set de 5 Bandas de resistencia + Agarraderas",10000,"img/bandas-elásticas-2.jpg");
        this.agregarRegistro(4,"Paralelas de 70cm",8000,"/img/img_67942-36362c4af8fb2eb96f15907878264295-240-0.jpg");
        this.agregarRegistro(5,"Barras Multifuncional",20000,"/img/BARRA-MULTIFUNCIONAL-min.jpg");
    }
    agregarRegistro(id,nombre,precio,imagen){
        const producto=new Productos(id,nombre,precio,imagen);
        this.productos.push(producto);
    }
    traeRegistro(){
        return this.productos;
    }
    registroPorId(id){
        return this.productos.find((producto)=> producto.id===id)
    }
}
const baseDeDatos=new BD();
//Carrito
class Carrito{
    constructor(){
        const carritoStorage=JSON.parse(localStorage.getItem("carrito"))
        this.carrito= carritoStorage || [];
        this.total=0;
        this.totalCarrito=0;
        this.listar();
    }

    enCarrito({id}){
       return this.carrito.find((producto)=>producto.id===id);
    }
    
    agregarProducto(nuevoProducto){
        const productoEnCarrito=this.enCarrito(nuevoProducto);
        (productoEnCarrito)?productoEnCarrito.cantidad++:this.carrito.push({...nuevoProducto, cantidad:1});
        localStorage.setItem("carrito",JSON.stringify(this.carrito));
        this.listar();
    }

    listar(){
        this.total = 0;
        this.totalProductos = 0;
        divCarrito.innerHTML="";
        for(const productos of this.carrito){
            divCarrito.innerHTML +=
            `<div class="section__card--carrito">
            <span id="prodCant">${productos.cantidad}</span>
            <img class="card__image--carrito" src=${productos.imagen} alt="">
            <span class="card__text--carrito">${productos.nombre}</span>
            <button id="boton-eliminar" data-id=${productos.id}>Eliminar</button>
            </div>`;
            this.total += productos.precio * productos.cantidad;
        }
        let botonesQuitar=document.querySelectorAll("#boton-eliminar");
        for(const boton of botonesQuitar){
            boton.addEventListener("click",()=>{
            const id=Number(boton.dataset.id);
            carrito.quitar(id);
        });
        }
        prodTot.innerText=`Total: $${this.total}`;
    }
    quitar(id){
        let index=this.carrito.findIndex((producto)=> producto.id===id)
        if(this.carrito[index].cantidad>1){
            this.carrito[index].cantidad--;
        }
        else{
            this.carrito.splice(index,1);
        } 
        localStorage.setItem("carrito",JSON.stringify(this.carrito));
        this.listar();
    }
    
}

//Inializacion
const carrito=new Carrito();
cargarProducto(baseDeDatos.traeRegistro());
//Funcion para cargar un producto
function cargarProducto(prod){
    divProd.innerHTML="";
    for (const productos of prod){
        divProd.innerHTML+=`
        <div class="col-7 col-md-5 col-lg-3 card">
        <img class="card__image"src=${productos.imagen} alt="">
        <span class="card__text">${productos.nombre}</span>
        <p class="precio">$${productos.precio}</p>
        <button id="boton-de-compra" data-id=${productos.id}>Agregar</button>
        </div>`;
    }
    let botonesAgregar=document.querySelectorAll("#boton-de-compra");
    for(const boton of botonesAgregar){
    boton.addEventListener("click",()=>{
        const id=Number(boton.dataset.id);
        const producto= baseDeDatos.registroPorId(id);
        carrito.agregarProducto(producto);
    });
    };
};