const { alias } = require('react-app-rewire-alias')
module.exports = function override(config) {
  alias({
    '@config': 'src/config',
    '@components': 'src/components',
    '@context': 'src/RecipeContext',
    '@styles': 'src/styles',
    '@img': 'src/assets/img',
    '@myTypes': 'src/myTypes',
    '@pages': 'src/pages',
    '@RecipesCardsPage': 'src/pages/MenuPage',
    '@DetailRecipePage': 'src/pages/DetailRecipePage',
  })(config)
  return config
}
