//adicionar o token do finnhub stock APIs
const token = ''

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
	const table = document.querySelector('#table-acoes')
	let rows = table.innerHTML
	allStocks.map(stock => {
		rows += 
			`<tr>
				<td>${stock.bolsa}</td>
				<td>${stock.codigo}</td>
				<td>${stock.empresa}</td>
				<td>${realFormat(stock.valor / 100)}</td>
				<td>${stock.variacao} %</td>
				<td>${stock.nAcoes}</td>
				<td>${realFormat((stock.valor / 100) * stock.nAcoes)}</td>
			</tr>`
	})
	table.innerHTML = rows
}

const openModal = (idModal) => {
	const modal = document.getElementById(idModal)
	modal.style.display = 'flex'
}

const closeModal = (event, id) => {
	if(id){
		const modal = document.getElementById(id)
		modal.style.display = 'none'
		return
	}

	if(event?.target?.className === "modal"){
		const modal = document.getElementById(event.target.id)
		modal.style.display = 'none'
		return
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

        closeModal(null, 'add-form-modal')
}

// async function testeAPI(){

// }

const testeApi = async () => {
	const response = await fetch('https://finnhub.io/api/v1/quote?symbol=AAPL&token=cp1aj71r01qu1k1i369gcp1aj71r01qu1k1i36a0')
	//const response = await fetch('https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=cp1aj71r01qu1k1i369gcp1aj71r01qu1k1i36a0')
	
	console.log(response)
	const result = await response.json()
	console.log(result.objectName)
}

const createApiCard = async (event) =>{
	event.preventDefault()
	const {codigo, nAcoes} = event.target.elements

	const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${codigo.value}&token=${token}`)
	const result = await response.json()

	const response2 = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${codigo.value}&token=${token}`)
	const profile = await response2.json()

	const stock = {
		bolsa: profile.exchange.split(' ')[0],
		codigo: codigo.value,
		empresa: profile.name,
		valor: result.c * 100,
		variacao: result.d,
		nAcoes: nAcoes.value
	}

	addCard(stock)
	event.target.reset()
	closeModal(null, 'add-api-modal')
}
