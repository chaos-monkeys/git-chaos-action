module.exports = {
  extends: ["airbnb-base"],
  env: {
    jest: true
  },
  rules: {
    camelcase: [2, { ignoreDestructuring: true, properties: "never" }]
  }
};
