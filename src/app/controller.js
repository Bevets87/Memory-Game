import _ from 'lodash'

function Controller (model, view) {
  var self = this

  self.model = model
  self.view = view
  //init game from initial state of model and display cards
  self.model.initState(state => {
    self.shuffleCards(state.cards, state => {
      self.view.render('displayCards', state.cards)
    })
  })

  // update state of model when user interacts with view
  self.view.bind('userPickCard', function (cardID) {

    let { picks, matches } = self.model.state
    let cards = self.model.state.cards.slice()
    // get card from model that was picked in view
    let card = _.find(cards, {id: cardID})
    // if card was not picked, not matched, and picks < 2 then pick card
    if (!card.picked && !card.matched && picks < 2) {
      // update state of model with picked card and pick count
      let cardIndex = _.findIndex(cards, {id: card.id})
      cards[cardIndex].picked = true
      picks++

      self.model.setState({cards: cards, picks: picks}, state => {
        self.view.render('rotateCard', state.cards[cardIndex].id)
      })
      // if pick count equals two then check to see if cards match
      if (picks == 2) {
        const pickedCards = cards.filter(card => card.picked === true)
        let cardIndexOne = _.findIndex(cards, {id: pickedCards[0].id})
        let cardIndexTwo = _.findIndex(cards, {id: pickedCards[1].id})
        // if cards match then change status picked to status matched and update model
        if (pickedCards[0].name === pickedCards[1].name) {
          cards[cardIndexOne].matched = true
          cards[cardIndexOne].picked = false
          cards[cardIndexTwo].matched = true
          cards[cardIndexTwo].picked = false
          matches++
          self.model.setState({cards: cards, picks: 0, matches: matches}, () => {})
        } else {
          //if cards dont match then remove status picked and update state of model
          setTimeout(() => {
            cards[cardIndexOne].picked = false
            cards[cardIndexTwo].picked = false

            self.model.setState({cards: cards, picks: 0}, state => {
              self.view.render('rotateCard', state.cards[cardIndexOne].id)
              self.view.render('rotateCard', state.cards[cardIndexTwo].id)
            })
          }, 800)
        }
      }
      //if all cards have been matched then reset game
      if (matches === 15) {
        setTimeout(() => {
          cards.forEach(card => {
            self.view.render('rotateCard', card.id)
            self.view.render('removeCard', card.id)
          })
          self.model.initState(state => {
            self.shuffleCards(state.cards, state => {
              self.view.render('displayCards', state.cards)
            })
          })
        }, 800)
      }
    }
  })
}

Controller.prototype.shuffleCards = function (cards, cb) {
  var self = this
  cards = cards.slice()
  var shuffled = [];
  while (cards.length > 0) {
    var randomIndex = Math.floor(Math.random() * cards.length)
    shuffled.push(cards[randomIndex])
    cards.splice(randomIndex, 1)
  }
  self.model.setState({cards: shuffled}, state => {
    cb(state)
  })
}

export default Controller
