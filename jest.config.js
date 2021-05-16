module.exports = async () => {
  return {
    rootDir: "./",
    verbose: true,
    moduleNameMapper: {
      "\\.(scss)$": "identity-obj-proxy",
    },
    automock: false,
    setupFiles: ["./setupJest.js", "jest-localstorage-mock"],
  };
};
