export default {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleFileExtensions: ["js", "jsx", "json", "node"],
  }
  
module.exports = {
  // Mapeia os arquivos CSS para um módulo fictício vazio para que Jest os ignore.
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
