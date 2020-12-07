import makeZebrunnerAPI from './lib'

declare function X(...args: Parameters<typeof makeZebrunnerAPI>): ReturnType<typeof makeZebrunnerAPI>

export default X
