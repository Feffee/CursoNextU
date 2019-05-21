var Calculadora = {
  // Inicializacion de la calculadora
  pantalla: document.getElementById("display"),
  valorPantalla: "0",
  operacion: "",
  primerValor: 0,
  segundoValor: 0,
  valorFinal: 0,
  resultado: 0,
  teclaIgual: false,

  init: function(){
    this.asignarEventoFormatoBotones(".tecla");
    this.asignarTeclas();
  },

  // Asignacion de formato a los botones

  asignarEventoFormatoBotones: function(selector){
    var x = document.querySelectorAll(selector);
    var i = 0;
    for (i = 0; i<x.length; i++){
      x[i].onclick = this.eventoAchicaBoton;
      x[i].onmouseleave = this.eventoNormalBoton;
    };
  },

  eventoAchicaBoton: function(event){
    Calculadora.AchicaBoton(event.target);
  },

  eventoNormalBoton: function(event){
    Calculadora.NormalBoton(event.target);
  },

  // Formato de los botones

  AchicaBoton: function(elemento){
    var x = elemento.id;
    // Parte inferior de calc
    if(x=="1" || x=="2" || x=="3" || x=="0" || x=="punto" || x=="igual"){
      elemento.style.padding = "1%";
      // Boton +
    } else if (x=="mas"){
      elemento.style.padding = "2.5%";
      // Botones restantes (4,5,6,X,-,+-,on,/,raiz)
    } else {
      elemento.style.padding = "1%";
    }
  },

  NormalBoton: function(elemento){
    var x = elemento.id;
    // Parte inferior de calc
    if(x=="1" || x=="2" || x=="3" || x=="0" || x=="punto" || x=="igual"){
      elemento.style.width = "29%";
      elemento.style.height = "62.91px";
      elemento.style.padding = "0px";
      // Boton +
    } else if (x=="mas"){
      elemento.style.width = "90%";
      elemento.style.height = "100%";
      elemento.style.padding = "0px";
      // Botones restantes (4,5,6,X,-,+-,on,/,raiz)
    } else {
      elemento.style.width = "22%";
      elemento.style.height = "62.91px";
      elemento.style.padding = "0px";
    }
  },

  asignarTeclas: function(){
    document.getElementById("0").addEventListener("click", function() {Calculadora.ingresoNumero("0");});
    document.getElementById("1").addEventListener("click", function() {Calculadora.ingresoNumero("1");});
    document.getElementById("2").addEventListener("click", function() {Calculadora.ingresoNumero("2");});
    document.getElementById("3").addEventListener("click", function() {Calculadora.ingresoNumero("3");});
    document.getElementById("4").addEventListener("click", function() {Calculadora.ingresoNumero("4");});
    document.getElementById("5").addEventListener("click", function() {Calculadora.ingresoNumero("5");});
    document.getElementById("6").addEventListener("click", function() {Calculadora.ingresoNumero("6");});
    document.getElementById("7").addEventListener("click", function() {Calculadora.ingresoNumero("7");});
    document.getElementById("8").addEventListener("click", function() {Calculadora.ingresoNumero("8");});
    document.getElementById("9").addEventListener("click", function() {Calculadora.ingresoNumero("9");});
    document.getElementById("on").addEventListener("click", function() {Calculadora.borrarPantalla();});
    document.getElementById("sign").addEventListener("click", function() {Calculadora.cambioSigno();});
    document.getElementById("raiz").addEventListener("click", function() {Calculadora.ingresoOp("raiz");});
    document.getElementById("dividido").addEventListener("click", function() {Calculadora.ingresoOp("/");});
    document.getElementById("por").addEventListener("click", function() {Calculadora.ingresoOp("*");});
    document.getElementById("menos").addEventListener("click", function() {Calculadora.ingresoOp("-");});
    document.getElementById("mas").addEventListener("click", function() {Calculadora.ingresoOp("+");});
    document.getElementById("punto").addEventListener("click", function() {Calculadora.ingresoDecimal();});
    document.getElementById("igual").addEventListener("click", function() {Calculadora.result();});
  },

  borrarPantalla: function(){
    this.valorPantalla = "0";
    this.op = "";
    this.primerValor = 0;
    this.segundoValor = 0;
    this.resultado = 0;
    this.Op = "0";
    this.teclaIgual = false;
    this.valorFinal = 0;
    this.refresco();
  },

  cambioSigno: function(){
    if(this.valorPantalla != 0){
      var num;
      if (this.valorPantalla.charAt(0)=="-"){
        num = this.valorPantalla.slice(1);
      } else {
        num = "-" + this.valorPantalla;
      }
    this.valorPantalla = "";
    this.valorPantalla = num;
    this.refresco();
    }
  },

  ingresoDecimal: function(){
    if (this.valorPantalla.indexOf(".")== -1){
      if (this.valorPantalla == ""){
        this.valorPantalla = "0."+ this.valorPantalla;
      } else {
        this.valorPantalla = this.valorPantalla + ".";
      }
    }
  },

  ingresoNumero: function(num){
    if (this.valorPantalla.length < 8){
      if (this.valorPantalla== "0"){
        this.valorPantalla = "";
        this.valorPantalla = this.valorPantalla + num;
      } else {
        this.valorPantalla = this.valorPantalla + num;
      }
    this.refresco();
    }
  },

  ingresoOp: function(op){
    this.primerValor = parseFloat(this.valorPantalla);
    this.valorPantalla = "";
    this.op = op;
    this.teclaIgual = false;
    this.refresco();
  },

  result: function(){
    if (!this.teclaIgual){
      this.segundoValor = parseFloat(this.valorPantalla);
      this.valorFinal = this.segundoValor;
      this.hacerOp(this.primerValor, this.segundoValor, this.op);
    } else {
      this.hacerOp(this.primerValor, this.valorFinal, this.op);
    }

    this.primerValor = this.resultado;
    this.valorPantalla = "";

    if (this.resultado.toString().length <= 8){
      this.valorPantalla = this.resultado.toString();
    } else {
      this.valorPantalla = this.resultado.toString().slice(0,8) + "....";
    }

    this.teclaIgual = true;
    this.refresco();
  },

  hacerOp: function(primerValor, segundoValor, op){
    switch(op){
      case "+":
        this.resultado = eval(primerValor + segundoValor);
      break;
      case "-":
        this.resultado = eval(primerValor - segundoValor);
      break;
      case "*":
        this.resultado = eval(primerValor * segundoValor);
      break;
      case "/":
        this.resultado = eval(primerValor / segundoValor);
      break;
      default:
    }
  },

  refresco: function(){
    this.pantalla.innerHTML = this.valorPantalla;
  }

};

Calculadora.init();








  // init: function(){
    // pantalla: document.getElementById("display"),
    // on: document.getElementById("on")
    // var signo= document.getElementById("sign"),
    // var raiz= document.getElementById("raiz"),
    // var dividido= document.getElementById("dividido"),
    // var multi= document.getElementById("por"),
    // var menos= document.getElementById("menos"),
    // var mas= document.getElementById("mas"),
    // var punto= document.getElementById("punto"),
    // var igual= document.getElementById("igual"),
    // var num0= document.getElementById("0"),
    // var num1= document.getElementById("1"),
    // var num2= document.getElementById("2"),
    // var num3= document.getElementById("3"),
    // var num4= document.getElementById("4"),
    // var num5= document.getElementById("5"),
    // var num6= document.getElementById("6"),
    // var num7= document.getElementById("7"),
    // var num8= document.getElementById("8"),
    // var num9= document.getElementById("9"),
  // }
// }
// Calculadora();
// para cambiar el display
// document.getElementById('display').innerHTML="num";
