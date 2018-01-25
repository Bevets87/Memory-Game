import { TweenMax } from 'gsap'

class View {
  constructor () {
    const self = this;
    self.$cards = document.querySelectorAll('.card');
  }

  bind = (event, handler) => {
    if (event === 'startGame') {
      window.addEventListener('load', () => {
        handler()
      })
    }
    if (event === 'userCardPick') {
      Array.prototype.forEach.call(this.$cards, $card => {
        $card.addEventListener('click', () => {
          let cardID = parseInt($card.id)
          handler(cardID)
        })
      })
    }
  }

  render = (viewCommand, parameter) => {
    const viewCommands = {
      'rotateCard': () => {
        let { card } = parameter;
        if (card) {
          Array.prototype
          .filter.call(this.$cards, $card => $card.id == card.id.toString())
          .map( $card => {
            TweenMax.to($card, 0.05, {rotationY: '+=180'})
          })
        }
      },
      'displayCards': () => {
        let { cards } = parameter
        Array.prototype
        .forEach.call(this.$cards, ($card, index) => {
          const { icon, id } = cards[index]
          const $h1 = document.createElement('h1')
          const $i = document.createElement('i')
          $i.className = icon
          $h1.appendChild($i)
          $card.id = id
          $card.children[1].appendChild($h1)
        })
      },
      'removeCard': () => {
        let { card } = parameter
        Array.prototype
        .filter.call(this.$cards, $card => $card.id == card.id.toString())
        .map($card => {
          $card.children[1].children[0].removeChild($card.children[1].children[0].children[0])
          $card.children[1].removeChild($card.children[1].children[0])
        })
      }
    }
    viewCommands[viewCommand]()
  }
}

export default View
