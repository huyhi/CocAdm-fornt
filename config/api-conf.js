const isProd = Object.is(process.env.NODE_ENV, 'production')

const baseUrl = isProd ? 'http://coc.annhuny.com/' : '/api'

const apiMap = {
    seasonList: '/api/season/',
    dailyStatistic: '/api/daily/'
}

export {
    apiMap,
    baseUrl
}
