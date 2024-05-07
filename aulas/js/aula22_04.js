
console.log("arquivo externo");

//let cria uma variavl e não deixa criar uma mesma variavel no bloco
//var cria uma variavel e permite criar uma mesma variavel no bloco
//const cria uma constante

// valor alterado usa:
let var1 = 10;

//valor que não será alterado:
const var2 = 20;

console.log(var1);

let nome = "Jonny";
//com crase e desse jeito, faz com que seja possivel concatenar
let var3 = `${nome} Vitor`; 

if (nome == "jonny"){

} else{

}

for(let i = 0; i<10;i++){

}

const valor1 =10;
const valor2="10";
if (valor1 == valor2){
    //vai retornar true
}

//condição ternaria
const nomeCompleto = true;
// const nomevar = condicao ? V : F
const meuNome = nomeCompleto ? "Jonny vitor" : "Jonny";

const user = {
    nome: "username",
    idade: 40,
    email: "email@email.com",
    endereco: {
        rua: "nomerua",
        numero: 24
    }
}

function soma (valor1, valor2){
    return valor1 + valor2
}

const soma = function(valor1, valor2){
    return valor1 + valor2
}

const soma =(valor1, valor2) => {
    return valor1 + valor2
}

const stock= {
    bolsa: "NASDAQ",
    ticker: "AAPL",
    company: "Apple Inc",
    valor: 25080,
    variacao: 0.35,
    nActions: 40,
}
//Desestruturação
const {bolsa, ticker, company, valor, variacao, nActions} = stock

const{bolsa, ticker: codigo, empresa} = stock