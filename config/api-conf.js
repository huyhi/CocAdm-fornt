const isProd = Object.is(process.env.NODE_ENV, 'production')

const baseUrl = isProd ? 'http://coc.annhuny.com/' : '/api'

const apiMapBackend = {
    seasonList: '/api/season/',
    dailyStatistic: '/api/daily/',
    realtime: '/api/realtime/'
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
