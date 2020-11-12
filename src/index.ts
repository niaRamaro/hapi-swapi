import { Server } from '@hapi/hapi'

import { searchHandler } from './controllers/searchController'

const init = async () => {
    const server = new Server({
        port: 3000,
        host: 'localhost'
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: searchHandler
    })

    await server.start()
    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()
