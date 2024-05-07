

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


function addCard({bolsa, ticker, company, valor, variacao, nActions}){
    const main = document.querySelector(`body > main`)

    main.innerHTML = main.innerHTML + `
    <div class="card-ticker">
    <header>
        <h2><span>${bolsa}:</span> ${ticker}</h2>
        <h1>${company}</h1>
    </header>
    <main>
        <p>R$ ${realFormat(valor / 100)}</p>
        <span ${ variacao < 0 ? 'style="background: #FF0000;"' : ''} >${ variacao < 0 ? '▼' : '▲'} ${variacao}%</span>
        <span>R$ ${realFormat(((+valor / 100)*(variacao / 100)))}</span>
    </main>
    <footer>
        <div>
            <p>${nActions}</p>
            <span>Ações</span>
        </div>
        <div>
            <div>
                <p>R$ ${realFormat(nActions * (+valor / 100))}</p>
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

const openModal = () => {
    const modal = document.getElementById("add-card-modal")
    modal.style.display = "flex"
}

const closeModal = (event, id) => {

    const modal = document.getElementById("add-card-modal")

    if(event?.target?.id === 'add-card-modal' || id === 'add-card-modal'){
        modal.style.display = "none"
    }
    
}

const createCard = (event) =>{
        event.preventDefault()

        // const {bolsa, ticker, company, valor, variacao, nActions} = event.target.elements
        // // addCard({
        // //     bolsa: bolsa.value,
        // //     ticker: ticker.value,
        // //     company: company.value,
        // //     valor: valor.value,
        // //     variacao: variacao.value,
        // //     nActions: nActions.value
        // // })

        const formData = new FormData(event.target)
        const stock = Object.fromEntries(formData)
        addCard(stock)

        event.target.reset()

        closeModal(null, 'add-card-modal')
}
