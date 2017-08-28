function View () {
  var self = this
  self.$cards = document.querySelectorAll('.card')
}

View.prototype.bind = function (event, handler) {
  var self = this
  if (event === 'userPickCard') {
    self.$cards.forEach($card => {
      $card.addEventListener('click', () => {
        let cardID = parseInt($card.id)
        handler(cardID)
      })
    })
  }
}

View.prototype.render = function (viewCommand, parameter) {
  var self = this
  const viewCommands = {
    'rotateCard': function () {
      let $card = Array.from(self.$cards).filter($card => $card.id == parameter.toString())[0]
      $card.style.transform += 'rotateY(180deg)'


    },
    'displayCards': function () {
      Array.from(self.$cards).forEach(($card, index) => {
        const { icon, id } = parameter[index]
        const $h1 = document.createElement('h1')
        const $i = document.createElement('i')
        $i.className = icon
        $h1.appendChild($i)
        $card.id = id
        $card.children[1].appendChild($h1)
      })
    },
    'removeCard': function () {
      let $card = Array.from(self.$cards).filter($card => $card.id == parameter.toString())[0]
      $card.children[1].children[0].removeChild($card.children[1].children[0].children[0])
      $card.children[1].removeChild($card.children[1].children[0])
    }
  }
  viewCommands[viewCommand]()
}

export default View
