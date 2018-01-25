import _ from 'lodash'
import Controller from '../app/controller'
import Model from '../app/model'
import View from '../app/view'

document.body.innerHTML =
'<div id="app">' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
' <div class="card">' +
'  <div class="front"><h1 class="logo">Memory</h1></div>' +
'  <div class="back"></div>' +
' </div>' +
'</div>'


class App {
  constructor () {
    this.model = new Model()
    this.view = new View()
    this.controller = new Controller(this.model, this.view)
  }
}

const app = new App()

describe('App', () => {

  beforeEach(() => {
    app.view.render('displayCards', {cards: app.model.state.cards})
    app.view.bind('userCardPick', pick_id => {
      app.view.render('rotateCard', {card: app.model.cards[pick_id]})
    })
  })

  afterEach(() => {
    app.model.state.cards.forEach(card => {
      app.view.render('removeCard', {card: card})
    })

  })

  //model tests
  test('it holds an object called state that contains game data', () => {
    expect(app.model.state.pickCount).toBe(0)
    expect(app.model.state.matchCount).toBe(0)
    expect(app.model.state.cards.length).toBe(30)
  })
  test('it has a method that changes state of model', () => {
    app.model.setState({pickCount: 2}, state => {
      expect(app.model.state.pickCount).toEqual(2)
    })
  })

  //controller tests
  test('it has a method that shuffles cards array from model', () => {
    let cards = app.model.state.cards
    let shuffledCards = app.controller.shuffleCards(cards.slice())
    expect(shuffledCards[0].id === cards[0].id).toBe(false)

  })
  //view tests
  test('it has a method that binds user click event and updates state', () => {
    const $card = document.getElementById("1");
    let event = new MouseEvent('click', {
        bubbles: false,
        cancelable: false
    })
    $card.dispatchEvent(event)
    expect(app.model.state.cards[1].picked).toEqual(true)
  })
  test('it has a method that renders card rotation based on user click', () => {
    app.view.render('rotateCard', 4)
    const $cards = document.querySelectorAll('.card')
    const $card = Array.from($cards).filter($card => $card.id == '4')[0]
    expect($card.style.transform).toBe('undefinedrotateY(180deg)')
  })
  test('it has a method that clears card data from the view', () => {
    const $cards = document.querySelectorAll('.card')
    const $card = Array.prototype.filter.call($cards, $card => $card.id == '7')[0]
    const card = app.model.state.cards.filter(card => card.id.toString() == $card.id)[0]
    app.view.render('removeCard', {card: card})
    expect($card.children[1].firstChild).toBe(null)
  })
})
