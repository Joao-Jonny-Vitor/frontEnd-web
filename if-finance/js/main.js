

const allStocks =[{
    bolsa: "NASDAQ",
    ticker: "AAPL",
    company: "Apple Inc",
    valor: 25080,
    variacao: 0.35,
    nActions: 40,
},
{
    bolsa: "NASDAQ",
    ticker: "MSFT",
    company: "Microsoft Corp",
    valor: 51090,
    variacao: -1.35,
    nActions: 20,
},
{
    bolsa: "NASDAQ",
    ticker: "Meta",
    company: "Meta Platform INC",
    valor: 43262,
    variacao: 2.8,
    nActions: 10,
},
]


function addCard(stock){
    const main = document.querySelector(`body > main`)
    main.innerHTML = main.innerHTML + `
    <div class="card-ticker">
    <header>
        <h2><span>${stock.bolsa}:</span> ${stock.ticker}</h2>
        <h1>${stock.company}</h1>
    </header>
    <main>
        <p>R$ ${realFormat(stock.valor / 100)}</p>
        <span ${ stock.variacao < 0 ? 'style="background: #FF0000;"' : ''} >${ stock.variacao < 0 ? '▼' : '▲'} ${stock.variacao}%</span>
        <span>R$ ${realFormat(((+stock.valor / 100)*(stock.variacao / 100)))}</span>
    </main>
    <footer>
        <div>
            <p>${stock.nActions}</p>
            <span>Ações</span>
        </div>
        <div>
            <div>
                <p>R$ ${realFormat(stock.nActions * (+stock.valor / 100))}</p>
                <span>Posição</span>
            </div>
        </div>
    </footer>   
</div>`
}

function realFormat(valor){
    return valor.toFixed(2).toString().replace('.',',')
}

function loadCards(){
    // for(let i=0; i < allStocks.length; i++){
    //     addCard(allStocks[i])
    // }

    allStocks.map(stock => addCard(stock))  
}

function addTable(stock){
    const main = document.querySelector("body > main > table#att")
    main.innerHTML = main.innerHTML + `
            <tr>
                <th>${stock.bolsa}</th>
                <th>${stock.ticker}</th>
                <th>${stock.company}</th>
                <th>${realFormat(stock.valor / 100)}</th>
                <th>${realFormat(stock.variacao)}</th>
                <th>${stock.nActions}</th>
                <th>${realFormat(stock.nActions * (+stock.valor / 100))}
            </tr>
    `
}

function loadTable(){
    allStocks.map(stock => addTable(stock))
}