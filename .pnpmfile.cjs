module.exports = {
  // Disable supply-chain policy checks to allow recently-published dependencies
  // in Docker/CI environments where we can't update the lockfile immediately
  hooks: {
    readPackage(pkg, context) {
      return pkg
    },
  },
}
