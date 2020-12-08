describe('Test-file-2-describe-1', () => {
  describe('Test-file-2-describe-1-1', () => {
    it('Test-file-2-describe-1-1-test-case-1-success', () => {
      expect(true).toBe(true)
    })
    it('Test-file-2-describe-1-1-test-case-2-success', () => {
      expect(true).toBe(true)
    })
  })

  describe('Test-file-2-describe-1-2', () => {
    it('Test-file-2-describe-1-2-test-case-1-success', () => {
      expect(true).toBe(true)
    })
    it('Test-file-2-describe-1-2-test-case-2-success', () => {
      expect(true).toBe(true)
    })
  })
})


describe('Test-file-2-describe-2', () => {
  describe('Test-file-2-describe-2-1', () => {
    it('Test-file-2-describe-2-1-test-case-1-success', () => {
      expect(true).toBe(true)
    })
    it('Test-file-2-describe-2-1-test-case-2-failed', () => {
      expect(true).toBe(false)
    })
  })

  describe('Test-file-2-describe-2-2', () => {
    it('Test-file-2-describe-2-2-test-case-1-success', () => {
      expect(true).toBe(true)
    })
    it('Test-file-2-describe-2-2-test-case-2-success', () => {
      expect(true).toBe(true)
    })
  })
})
