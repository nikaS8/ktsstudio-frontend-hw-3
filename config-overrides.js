const { alias } = require('react-app-rewire-alias')
module.exports = function override(config) {
  alias({
    '@config': 'src/config',
    '@styles': 'src/styles',
    '@img': 'src/assets/img',
    '@myTypes': 'src/myTypes',
    '@pages': 'src/pages',
    '@RecipesCardsPage': 'src/pages/RecipesCardsPage',
    '@DetailRecipePage': 'src/pages/DetailRecipePage',
  })(config)
  return config
}
