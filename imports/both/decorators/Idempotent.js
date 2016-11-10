function Idempotent(target, key, descriptor) {
  const getter = descriptor.get
  const previous = new Map()

  function idempotentVersion() {
    let result = getter.call(this)

    const identifier = `${key}:${this._id}`
    const latestJson = JSON.stringify(result)
    let cachedJson = ''

    // caches the value of the identifier for comparing with the latest result
    if (previous.has(identifier)) {
      cachedJson = JSON.stringify(previous.get(identifier))
    }

    // compares the previous result with the newest
    if (latestJson === cachedJson) {
      result = previous.get(identifier)
    }

    previous.set(identifier, result)
    return result
  }

  descriptor.get = idempotentVersion // eslint-disable-line
}

export default Idempotent
