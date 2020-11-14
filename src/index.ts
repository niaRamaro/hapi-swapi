import { Server } from '@hapi/hapi'
import Joi from '@hapi/joi'

import { RESSOURCES } from './constants/swapi'
import { detailHandler } from './handlers/detailHandler'
import { searchHandler } from './handlers/searchHandler'

const init = async () => {
    const server = new Server({
        port: 3000,
        host: 'localhost'
    })

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: searchHandler
        },
        {
            method: 'GET',
            path: '/{type}/{id}',
            handler: detailHandler,
            options: {
                validate: {
                    params: <any>Joi.object({
                        type: Joi.string().valid(...Object.values(RESSOURCES)),
                        id: Joi.number()
                    })
                }
            }
        }
    ])

    await server.start()
    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()
