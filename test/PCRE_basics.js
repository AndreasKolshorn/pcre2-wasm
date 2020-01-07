import assert from 'assert'

import PCRE from '../src/lib/PCRE'

describe(`PCRE basics`, function () {
  describe(`init()`, function () {
    it(`should not throw`, async function () {
      this.timeout(5000)
      await PCRE.init()
    })
  })

  describe(`version()`, function () {
    it(`should return the version of the PCRE2 library`, function () {
      const version = PCRE.version()
      assert.strictEqual(version, `10.34 2019-11-21`)
    })
  })

  describe(`constructor()`, function () {
    it(`should not throw`, function () {
      const re = new PCRE('aaa', 'i')
      re.destroy()
    })

    it(`should throw on malformed pattern`, function () {
      assert.throws(() => new PCRE('a(a'), /missing closing parenthesis/)
    })

    it(`should throw an error with correct offset property`, function () {
      let err
      try { new PCRE('a)aa') }
      catch (e) { err = e }
      assert.strictEqual(err.offset, 1)
    })
  })

  describe(`createMatchData()`, function () {
    it(`should allocate a match data block`, function () {
      const re = new PCRE('aaa')

      const matchDataPtr = re.createMatchData()
      assert(matchDataPtr)
      if (matchDataPtr) {
        re.destroyMatchData()
      }
      re.destroy()
    })
  })
})