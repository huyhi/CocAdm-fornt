const isProd = Object.is(process.env.NODE_ENV, 'production')

const baseUrl = isProd ? 'http://coc.annhuny.com/' : 'api'

const apiMap = {
    seasonList: '/api/season/'
}

export {
    apiMap,
    // baseUrl
}
