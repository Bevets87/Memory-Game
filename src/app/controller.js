class Controller {
  constructor (model, view) {
    const self = this;

    self.model = model;
    self.view = view;

    self.handleUserCardPick = this.setResponsibilityChain(this.addPick, this.isMatch, this.resetGame)

    self.view.bind('startGame', () => {
      self.startGame({...self.model.state})
    })

    self.view.bind('userCardPick', pick_id => {
      self.handleUserCardPick({...self.model.state, picked_card: self.model.state.cards.filter(card => card.id === pick_id)})
    })

  }

  startGame = ({ cards }) => {
    this.model.setState({
      cards: this.shuffleCards(cards)
    }, newState => {
      this.view.render('displayCards', {cards: newState.cards})
    })
  }

  /* Chain Of Responsibility Design Pattern */
  setResponsibilityChain = (...tasks) => {
    let chain = [];

    tasks
    .map(task => task())
    .reduce((acc, curr) => {
      acc.setNext(curr)
      chain.push(acc)
      return curr;
    })

    let taskOne = chain.shift()

    return (args) => {
      taskOne.execute(args)
    }
  }

  addPick = () => ({
    next:null,
    setNext: nextHandler => {
      this.addPick.next = nextHandler
    },
    execute: ({ pickCount, cards, picked_card }) => {
      if (pickCount < 2) {
        let [pickedCard, newPickCount ] = picked_card.reduce((arr, pickedCard) => {
          if (!pickedCard.picked && !pickedCard.matched) {
            pickedCard.picked = true;
            pickCount++;
          } else {
            pickedCard = null;
          }
            arr.push(pickedCard, pickCount)
            return arr
        },[])

        this.model.setState({
          cards: cards.map(card => pickedCard && card.id === pickedCard.id ? pickedCard : card),
          pickCount: newPickCount
        }, newState => {
          this.view.render('rotateCard', {card: pickedCard ? pickedCard : null})
          if (newState.pickCount === 2) {
            this.addPick.next.execute({...newState})
          }
        })

      }
    }
  })

  isMatch = () => ({
    next: null,
    setNext: nextHandler => {
      this.isMatch.next = nextHandler
    },
    execute: ({ cards, matchCount }) => {

      let [ newMatchCount, cardOne, cardTwo ] = cards
      .filter(card => card.picked)
      .reduce((cardOne, cardTwo) => {
        cardOne.picked = false;
        cardTwo.picked = false;
        if (cardOne.name === cardTwo.name) {
          cardOne.matched = true;
          cardTwo.matched = true;
          matchCount++;
        }
        return [matchCount, cardOne, cardTwo]
      })

      this.model.setState({
        cards: cards
        .map(card => card.id === cardOne.id ? cardOne : card)
        .map(card => card.id === cardTwo.id ? cardTwo : card),
        matchCount: newMatchCount,
      }, newState => {
        setTimeout(() => {
          this.view.render('rotateCard', {card: !cardOne.matched ? cardOne : null})
          this.view.render('rotateCard', {card: !cardTwo.matched ? cardTwo : null})
          this.model.setState({pickCount: 0})
        }, 500)
        if (newState.matchCount === 15) {
          this.isMatch.next.execute({cards: newState.cards.slice()})
        }
      })
    }
  })

  resetGame = () => ({
    next: null,
    setNext: nextHandler => {
      this.resetGame.next = nextHandler
    },
    execute: ({ cards }) => {
      cards.forEach(card => {this.view.render('removeCard', {card: card})})
      setTimeout(() => {cards.forEach(card => {this.view.render('rotateCard', {card: card})})},500)

      this.model.setState({
        cards: cards.map(card => {card.matched = false;card.picked = false;return card}),
        pickCount: 0,
        matchCount: 0
      }, newState => {
        this.view.render('displayCards', {cards:this.shuffleCards(newState.cards)})
      })
    }
  })

  shuffleCards = cards => {
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
