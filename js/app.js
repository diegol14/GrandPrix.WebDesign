//Pac_Uf2_PereiraSotelo_DiegoLeonel
var cant = 9;
var carrera;
var ganador;
var fin = false;
var tablaPosiciones;

class Corredor {
    constructor(identificador, nombre) {
        this.identificador = identificador;
        this.pxRecorridos = 0;
        this.time = 0;
        this.nombre = nombre;
        var myImage = new Image(80, 60);
        myImage.src = "./img/car1.png";
        this.imagen = myImage;
    }
}

//Genero el array de objetos con 9 coches
carrera = new Array(corredor1 = new Corredor(1, "Corr_1"),
    corredor2 = new Corredor(2, "Corr_2"),
    corredor3 = new Corredor(3, "Corr_3"),
    corredor4 = new Corredor(4, "Corr_4"),
    corredor5 = new Corredor(5, "Corr_5"),
    corredor6 = new Corredor(6, "Corr_6"),
    corredor7 = new Corredor(7, "Corr_7"),
    corredor8 = new Corredor(8, "Corr_8"),
    corredor9 = new Corredor(9, "Corr_9"));

$(document).ready(function() {
    //Genero la meta en el ancho de window -100 
    var meta = ($(window).width() - 100);
    console.log(meta);


    $("#SeleccionarCantidad").on({ //Botón del desplegable a la escucha
            click: function() {
                    //Cantidad de corredores seleccionados en el desplegable    
                    cant = $("#numero").val();
                    console.log(cant);
                    $("#SeleccionarCantidad").hide(1200);

                    if (cant > 0 && cant <= 9) {
                        while (cant < carrera.length) {
                            corr = carrera.pop(); //Quito los coches sobrantes del array
                            console.log(corr);
                        }
                    } //end if cantidad
                    else { //Si le dan erroneamente al botón seleccionar
                        alert("No has seleccionado una cantidad \n de participantes")
                        location.reload(2500);
                    };

                    for (let i = 0; i < cant; i++) {

                        //Aquí +1 para que concuerde identificador con el div
                        let identificador = ((i + 1).toString());

                        nombre_corredor = prompt("Introduzaca el nombre del corredor", ("Corredor" + identificador));

                        //Asigno propiedades al corredor
                        console.log(carrera[i].nombre = nombre_corredor);
                        console.log(carrera[i].identificador);
                        carrera[i].imagen.src = ("./img/car" + identificador + ".png");
                    } //end for definicion del array

                    carreraShow();

                    console.log(carrera.length);

                    $("#iniciar").click(function() {
                            $("#iniciar").hide(800);
                            $("#reiniciar").show(800);
                            do {
                                for (let i = 0; i < carrera.length; i++) {
                                    let identificador = ((i + 1).toString());

                                    //Random y sumo la distancia
                                    let distancia = (Math.ceil(Math.random() * 10));
                                    console.log(distancia);

                                    $("#" + (identificador)).animate({ "left": "+=" + (distancia.toString() + "px") }, 25);

                                    /*Almaceno la distancia y el tiempo en el objeto*/
                                    carrera[i].time += 0.025;
                                    carrera[i].pxRecorridos += distancia;
                                    console.log(carrera[i].pxRecorridos); //control de carrera

                                    /* var p = $("#" + (identificador)).prop("marginLeft");
                                       console.log(p);*/
                                    /* let p = $("#" + (identificador)).last();
                                    let offset = p.offset();
                                    num = offset.left;
                                    num2 = offset.top;
                                    console.log(num);
                                    console.log(num2);
                                    num = $("#" + (identificador)).css("left");
                                    console.log(num); Esto y marginLeft me da 0px??*/

                                    //Fin de carrera y declaracion de ganador
                                    if (carrera[i].pxRecorridos >= meta) {
                                        ganador = carrera[i];
                                        fin = true;

                                    } //end if meta*/

                                    $("#reiniciar").click(function() {
                                        $("#reiniciar").hide(1200);
                                        $("#iniciar").show(2500);
                                        fin = true;
                                        $(".box").stop();

                                        for (let i = 0; i < carrera.length; i++) {

                                            let identificador = ((i + 1).toString());
                                            $("#" + (identificador)).css("left", "0");
                                            carrera[i].pxRecorridos = 0;
                                            carrera[i].time = 0;
                                            setTimeout(function() {
                                                location.reload();
                                            }, 2)
                                        }

                                    }); //End click reiniciar
                                }
                            }
                            while (!fin);
                            console.log(ganador.nombre);

                            /*Si la carrera ha terminado anuncio el ganador 
                            y ordeno el array por pixeles recorridos descendentemente*/
                            if (fin) {
                                setTimeout(function() {
                                    alert("The winner is : " + ganador.nombre);
                                }, 9000)

                                carrera.sort(function(a, b) {
                                    if (a.pxRecorridos > b.pxRecorridos) {
                                        return -1;
                                    }
                                    if (a.pxRecorridos < b.pxRecorridos) {
                                        return 1;
                                    }
                                    // a must be equal to b
                                    return 0;
                                }); //end sort

                                for (let i = 0; i < carrera.length; i++) {
                                    console.log(
                                        "Posicion " + (i + 1) + " : " + carrera[i].nombre + "\n"
                                    );
                                }

                                tablaPosiciones(); //LLamo a la funcion que construye la tabla

                                setTimeout(function() {
                                    $("table").show(2200);
                                    $(".box").hide(2200);
                                    $("#reiniciar").hide(2200);
                                    $("#reiniciarCarrera").show(2200);
                                }, 9500)

                                $("#reiniciarCarrera").click(function() {
                                    setTimeout(function() {
                                        location.reload();
                                    }, 20)
                                })

                            } //End if fin

                        }) //End click iniciar
                } //end click function
        }) //End listener seleccionar cantidad on






}); //end doc.ready