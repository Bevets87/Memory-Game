import { curry } from 'lodash/fp'

class Controller {
  constructor (model, view) {
    const self = this;

    self.model = model;
    self.view = view;

    self.handleUserCardPick = this._setNextChain(
      this._validatePickedCard,
      this.setPickedCard,
      this._checkPairedCardsForMatch,
      this.setPairedCards,
      this.resetCards
    )

    self.view.bind('startGame', () => {
      self.setStartGame({
        ...self.model.state
      })
    })

    self.view.bind('userCardPick', pick_id => {
      self.handleUserCardPick({
        ...self.model.state,
        picked_card: self.model.state.cards.filter(card => card.id == pick_id),
      })
    })

  }

  setStartGame = ({ cards }) => {
    return this.model.setState({
      cards: this._shuffleCards(cards)
    }, ({ cards }) => {
      this.view.render('displayCards', {cards: cards})
    })
  }

  setPickedCard = curry((next, { pickedCard, pickCount, cards }) => {
    const newState = this.model.setState({
      cards: cards.map(card => pickedCard && card.id === pickedCard.id ? pickedCard : card),
      pickCount: pickCount
    }, () => {
      this.view.render('rotateCard', {card: pickedCard ? pickedCard : null})
    })
    if (newState.pickCount === 2) {
      next({...newState})
    }
  })

  setPairedCards = curry((next, { cardOne, cardTwo, cards, matchCount }) => {
    const newState = this.model.setState({
      cards: cards
      .map(card => card.id === cardOne.id ? cardOne : card)
      .map(card => card.id === cardTwo.id ? cardTwo : card),
      matchCount: matchCount,
    }, () => {
      setTimeout(() => {
        this.view.render('rotateCard', {card: !cardOne.matched ? cardOne : null})
        this.view.render('rotateCard', {card: !cardTwo.matched ? cardTwo : null})
        this.model.setState({pickCount: 0})
      }, 500)
    })
    if (newState.matchCount === 15) {
      next({...newState})
    }
  })

  resetCards = ({ cards }) => {
    setTimeout(() => {
      cards.forEach(card => {
        this.view.render('rotateCard', {card: card})
        this.view.render('removeCard', {card: card})
      })
    }, 500)
    this.model.setState({
      cards: cards.map(card => {card.matched = false;card.picked = false;return card}),
      pickCount: 0,
      matchCount: 0
    }, ({ cards }) => {
      setTimeout(() => {
        this.view.render('displayCards', {cards: this._shuffleCards(cards)})
      }, 1000)
    })
  }

  _validatePickedCard = curry((next, { pickCount, picked_card, cards }) => {
    if (pickCount < 2) {
      const nextState = picked_card.reduce((acc, pickedCard) => {
      if (!pickedCard.picked && !pickedCard.matched) {
        pickedCard.picked = true;
        pickCount++
      } else {
          pickedCard = null;
      }
        acc.pickedCard = pickedCard
        return acc
      },{cards: cards})
      next({...nextState, pickCount})
    }
  })

  _checkPairedCardsForMatch = curry((next, { cards, matchCount }) => {
    let [ cardOne, cardTwo ] = cards
    .filter(card => card.picked)
    .reduce((cardOne, cardTwo) => {
      cardOne.picked = false;
      cardTwo.picked = false;
      if (cardOne.name === cardTwo.name) {
        cardOne.matched = true;
        cardTwo.matched = true;
        matchCount++;
      }
      return [ cardOne, cardTwo ]
    })
    next({cardOne, cardTwo, cards, matchCount})
  })

  _setNextChain = (...ops) => {
    return ops
    .reverse()
    .reduce((lastOp, prevOp) => {
      let curriedPrev = prevOp(lastOp)
      return curriedPrev
    })
  }

  _shuffleCards = cards => {
    cards = cards.slice()
    var shuffled = [];
    while (cards.length > 0) {
      var randomIndex = Math.floor(Math.random() * cards.length)
      shuffled.push(cards[randomIndex])
      cards.splice(randomIndex, 1)
    }
    return shuffled;
  }


}

export default Controller
