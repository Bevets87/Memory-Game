function Model () {
  var self = this
  self.state = {
    matches: 0,
    picks: 0,
    cards: []
  }
}

Model.prototype.setState = function (newState, cb) {
  var self = this
  self.state = Object.assign(
    {},
    self.state,
    newState
  )
  cb(self.state)
}

Model.prototype.initState = function (cb) {
  var self = this
  self.state = Object.assign(
    {},
    self.state,
    {
     matches: 0,
     picks: 0,
     cards: [
       {
         id: 1,
         name: 'amazon-web-services',
         icon: 'devicon-amazonwebservices-original',
         matched: false,
         picked: false
       },
       {
         id: 2,
         name: 'amazon-web-services',
         icon: 'devicon-amazonwebservices-original',
         matched: false,
         picked: false
       },
       {
         id: 3,
         name: 'atom',
         icon: 'devicon-atom-original',
         matched: false,
         picked: false
       },
       {
         id: 4,
         name: 'atom',
         icon: 'devicon-atom-original',
         matched: false,
         picked: false
       },
       {
         id: 5,
         name: 'babel',
         icon: 'devicon-babel-plain',
         matched: false,
         picked: false,
       },
       {
         id: 6,
         name: 'babel',
         icon: 'devicon-babel-plain',
         matched: false,
         picked: false
       },
       {
         id: 7,
         name: 'bootstrap',
         icon: 'devicon-bootstrap-plain',
         matched: false,
         picked: false
       },
       {
         id: 8,
         name: 'bootstrap',
         icon: 'devicon-bootstrap-plain',
         matched: false,
         picked: false
       },
       {
         id: 9,
         name: 'chrome',
         icon: 'devicon-chrome-plain',
         matched: false,
         picked: false
       },
       {
         id: 10,
         name: 'chrome',
         icon: 'devicon-chrome-plain',
         matched: false,
         picked: false
       },
       {
         id: 11,
         name: 'css3',
         icon: 'devicon-css3-plain',
         matched: false,
         picked: false
       },
       {
         id: 12,
         name: 'css3',
         icon: 'devicon-css3-plain',
         matched: false,
         picked: false
       },
       {
         id: 13,
         name: 'd3js',
         icon: 'devicon-d3js-plain',
         matched: false,
         picked: false
       },
       {
         id: 14,
         name: 'd3js',
         icon: 'devicon-d3js-plain',
         matched: false,
         picked: false
       },
       {
         id: 15,
         name: 'express',
         icon: 'devicon-express-original',
         matched: false,
         picked: false
       },
       {
         id: 16,
         name: 'express',
         icon: 'devicon-express-original',
         matched: false,
         picked: false
       },
       {
         id: 17,
         name: 'github',
         icon: 'devicon-github-plain',
         matched: false,
         picked: false
       },
       {
         id: 18,
         name: 'github',
         icon: 'devicon-github-plain',
         matched: false,
         picked: false
       },
       {
         id: 19,
         name: 'heroku',
         icon: 'devicon-heroku-original',
         matched: false,
         picked: false
       },
       {
         id: 20,
         name: 'heroku',
         icon: 'devicon-heroku-original',
         matched: false,
         picked: false
       },
       {
         id: 21,
         name: 'react',
         icon: 'devicon-react-original',
         matched: false,
         picked: false
       },
       {
         id: 22,
         name: 'react',
         icon: 'devicon-react-original',
         matched: false,
         picked: false
       },
       {
         id: 23,
         name: 'sass',
         icon: 'devicon-sass-original',
         matched: false,
         picked: false
       },
       {
         id: 24,
         name: 'sass',
         icon: 'devicon-sass-original',
         matched: false,
         picked: false
       },
       {
         id: 25,
         name: 'typescript',
         icon: 'devicon-typescript-plain',
         matched: false,
         picked: false
       },
       {
         id: 26,
         name: 'typescript',
         icon: 'devicon-typescript-plain',
         matched: false,
         picked: false
       },
       {
         id: 27,
         name: 'webpack',
         icon: 'devicon-webpack-plain',
         matched: false,
         picked: false
       },
       {
         id: 28,
         name: 'webpack',
         icon: 'devicon-webpack-plain',
         matched: false,
         picked: false
       },
       {
         id: 29,
         name: 'wordpress',
         icon: 'devicon-wordpress-plain',
         matched: false,
         picked: false
       },
       {
         id: 30,
         name: 'wordpress',
         icon: 'devicon-wordpress-plain',
         matched: false,
         picked: false
       }
     ]
   }
  )
  cb(self.state)
}

export default Model
