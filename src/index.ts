import { RouteOptionsCache, Server } from '@hapi/hapi'
import Joi from '@hapi/joi'

import { RESSOURCES } from './constants/swapi'
import { detailHandler } from './handlers/detailHandler'
import { searchHandler } from './handlers/searchHandler'

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3001
const cacheConfig =
    env === 'production'
        ? ({
              expiresIn: 30 * 60 * 1000,
              privacy: 'private'
          } as RouteOptionsCache)
        : false

const init = async () => {
    const server = new Server({
        port,
        host: '0.0.0.0',
        routes: {
            cors: true,
            cache: cacheConfig
        }
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
