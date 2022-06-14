

function spawn(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF()
    function step(nextF) {
      let next
      try {
        next = nextF()
      } catch (e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then(
        v => { step(() => gen.next(v)) },
        e => { step(() => gen.throw(e)) }
      )
    }
    step(() => gen.next(undefined))
  })
}

async function fn(args) {
  // ...
}

function fn(args) {
  return spawn(function* () {
    // ...
  })
}







// gen.next(v)