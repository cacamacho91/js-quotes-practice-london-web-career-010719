const BASEURL = 'http://localhost:3000/quotes'

const getQuotes = () => fetch(BASEURL).then(resp => resp.json())
const destroyQuote = quote => fetch(`${BASEURL}/${quote.id}`, { method: 'DELETE' }).then(resp => resp.json())
const createQuote = quote => {
    return fetch(BASEURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(quote) 
    }).then(resp => resp.json())
}
const patchQuote = quote => {
    return fetch(`${BASEURL}/${quote.id}`, {
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(quote)
    }).then(resp => resp.json())
}