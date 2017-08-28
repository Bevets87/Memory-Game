import _ from 'lodash'
import App from '../app/index'

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



const app = new App()


describe('App', () => {
  //model tests
  test('it holds an object called state that contains game data', () => {
    expect(app.model.state.picks).toBe(0)
    expect(app.model.state.matches).toBe(0)
    expect(app.model.state.cards.length).toBe(30)
  })
  test('it has a method that changes state of model', () => {
    app.model.setState({picks: 2}, state => {
      expect(app.model.state.picks).toBe(2)
    })
  })
  test('it has a method that sets model to original state', () => {
    app.model.resetState(state => {
      expect(app.model.state.cards[0].name).toBe("amazon-web-services")
    })
  })
  //controller tests
  test('it has a method that shuffles cards array from model', () => {
    let cards = app.model.state.cards
    app.controller.shuffleCards(cards, state => {
      expect(cards.length === state.cards.length).toBe(true)
      expect(cards[0].name === state.cards[0].name).toBe(false)
    })
  })
  //view tests
  test('it has a method that binds user click event and updates state', () => {
    const $cards= document.querySelectorAll('.card')
    const $card = Array.from($cards).filter($card => $card.id == '6')[0]
    let event = new MouseEvent('click', {
        bubbles: true,
        cancelable: false
    })
    $card.dispatchEvent(event)
    let card = _.find(app.model.state.cards, {id: 6})
    expect(card.picked).toBe(true)
  })
  test('it has a method that renders card rotation based on user click', () => {
    app.view.render('rotateCard', 4)
    const $cards = document.querySelectorAll('.card')
    const $card = Array.from($cards).filter($card => $card.id == '4')[0]
    expect($card.style.transform).toBe('undefinedrotateY(180deg)')
  })
  test('it has a method that clears card data from the view', () => {
    const $cards = document.querySelectorAll('.card')
    const $card = Array.from($cards).filter($card => $card.id == '7')[0]
    app.view.render('removeCard', 7)
    expect($card.children[1].firstChild).toBe(null)
  })
})
