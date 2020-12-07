import makeZebrunnerAPI from './src'

declare function X(...args: Parameters<typeof makeZebrunnerAPI>): ReturnType<typeof makeZebrunnerAPI>

export default X
