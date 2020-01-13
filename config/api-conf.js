const isProd = Object.is(process.env.NODE_ENV, 'production')

const baseUrl = isProd ? 'http://coc.annhuny.com/' : '/api'

const apiMapBackend = {
    seasonList: '/api/season/',
    realtime: '/api/realtime/',
    dailyStatistic: '/api/daily/',
    player: '/api/player/',
}

const apiMapFrontend = {
    seasonList: '/season/',
    dailyStatistic: '/dailyStatistic/',
    realtime: '/realtime/'
}

export {
    apiMapBackend,
    apiMapFrontend,
    baseUrl
}
