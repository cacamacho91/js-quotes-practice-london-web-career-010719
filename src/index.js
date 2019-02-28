//==== Global Variables and State ====//
const quoteContainerEl = document.querySelector('#quote-list')

//==== Initialize Page ====//
document.addEventListener("DOMContentLoaded", () => {
    initialize()
})
const initialize = () => {
    getQuotes().then(drawQuoteCards)
    document.querySelector('#new-quote-form').addEventListener('submit', event => {
        event.preventDefault()
        const newQuote = {
            quote: event.target.quote.value,
            author: event.target.author.value,
            likes: 0
        }
        createQuote(newQuote).then(quote => {
            drawQuoteCard(quote)
            event.target.reset()
        })
    })
}

const drawEditForm = quote => event => {
    event.preventDefault()
    const toyFormEl = document.createElement('form')
    toyFormEl.id = 'toy-edit-form'
    toyFormEl.innerHTML = toyFormInnerHTML(quote)
    const formButtons = toyFormEl.querySelectorAll('button')
    //formButtons[0].addEventListener('click', likeQuote(quote))
    formButtons[1].addEventListener('click', reDrawQuoteCard(quote))
    const quoteCard = quoteContainerEl.querySelector(`li[data-quote-id="${quote.id}"]`)
    quoteCard.innerHTML = ''
    quoteCard.appendChild(toyFormEl)
}
const toyFormInnerHTML = quote => 
    `<div class="form-group">
        <label for="new-quote">Quote</label>
        <input type="text" name="quote" class="form-control" id="new-quote" value="${quote.quote}">
    </div>
    <div class="form-group">
    <label for="Author">Author</label>
    <input type="text" name="author" class="form-control" id="author" value="${quote.author}">
    </div>
    <button type="submit" class="btn btn-primary">Confirm Edits</button>
    <button type="submit" class="btn btn-secondary">Cancel</button>
    `


const drawQuoteCards = quotes => quotes.forEach(drawQuoteCard)
const drawQuoteCard = (quote, redraw=false) => {
    const quoteCardEl = document.createElement('li')
    quoteCardEl.dataset.quoteId = quote.id
    quoteCardEl.classList.add('quote-card')
    quoteCardEl.innerHTML = quoteCardHTML(quote)
    const quoteButtons = quoteCardEl.querySelectorAll('button')
    quoteButtons[0].addEventListener('click', likeQuote(quote))
    quoteButtons[1].addEventListener('click', deleteQuote(quote))
    quoteButtons[2].addEventListener('click', drawEditForm(quote))
    quoteContainerEl.appendChild(quoteCardEl)
}
const quoteCardHTML = quote =>
    `<blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
      <button class='btn-danger'>Delete</button>
      <button class='btn-warning'>Edit</button>
    </blockquote>`
const deleteQuote = quote => () => {
    destroyQuote(quote).then(() => removeQuoteCard(quote))
}
const likeQuote = quote => () => {
    quote.likes++
    patchQuote(quote).then(updateQuoteLikes)
}
const reDrawQuoteCard = quote => event => {
    event.preventDefault()
    quoteContainerEl.querySelector(`li[data-quote-id="${quote.id}"]`).innerHTML = quoteCardHTML(quote)
}
const updateQuoteLikes = quote => quoteContainerEl.querySelector(`li[data-quote-id="${quote.id}"]`).querySelector('span').innerText = quote.likes
const removeQuoteCard = quote => quoteContainerEl.querySelector(`li[data-quote-id="${quote.id}"]`).remove()
