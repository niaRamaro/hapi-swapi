import { Boom } from '@hapi/boom'
import { Request, ResponseToolkit } from '@hapi/hapi'

import { RESSOURCES } from '../constants/swapi'
import { Relation, RELATIONS } from '../constants/swapi'
import { SwapiDetail, SwapiInfos } from '../types/search'
import { getDetailSwapi, getSwapi } from '../utils/swapiClient'
import { getIdFromUrl } from '../utils/swapiFormatter'

type RelationUrls = { [key: string]: string[] }
type RelationsTree = { [key: string]: { [key: string]: SwapiInfos } }

export async function detailHandler(request: Request, h: ResponseToolkit) {
    try {
        const { type, id } = request.params
        const ressourceType = type as RESSOURCES

        const ressource = await getDetailSwapi(ressourceType, id)

        if (!ressource) {
            return new Boom('An error occured')
        }

        const relationKeys = RELATIONS[ressourceType]
        const relationsTree = await getRelations(<any>ressource, relationKeys)

        return attachRelations(ressource, relationKeys, relationsTree)
    } catch (e) {
        return new Boom('An error occured')
    }

    async function getRelations(
        relationUrls: RelationUrls,
        relationConfigs: Relation[]
    ): Promise<RelationsTree> {
        const relations: {
            relationType: string
            relations: any
        }[] = await Promise.all(
            relationConfigs.map(async ({ key, type }) => {
                const urls = relationUrls[key]
                const formatedUrls = urls
                    ? Array.isArray(urls)
                        ? urls
                        : [urls]
                    : []
                let relations: Promise<
                    { url: string; relation: SwapiInfos | null }[]
                > = new Promise((resolve) => resolve([]))

                if (formatedUrls.length) {
                    relations = Promise.all(
                        formatedUrls.map(async (url) => ({
                            url,
                            relation: await fetchRelation(
                                url,
                                RELATIONS[type].map(({ key }) => key)
                            )
                        }))
                    )
                }

                return {
                    relationType: key,
                    relations: (await relations).reduce((relationMap, item) => {
                        relationMap[item.url] = item.relation

                        return relationMap
                    }, {} as { [key: string]: SwapiInfos | null })
                }
            })
        )

        return (await relations).reduce((relationsTree, relation) => {
            relationsTree[relation.relationType] = relation.relations

            return relationsTree
        }, {} as RelationsTree)

        async function fetchRelation(
            url: string,
            relationKeys: string[]
        ): Promise<SwapiInfos | null> {
            try {
                const relation = await getSwapi<any>(url)

                relationKeys.forEach((key) => delete relation[key])
                relation.id = getIdFromUrl(relation.url)
                delete relation.url

                return relation
            } catch (e) {
                return null
            }
        }
    }

    function attachRelations(
        ressource: any,
        relationConfigs: Relation[],
        relationsTree: RelationsTree
    ): SwapiDetail {
        return Object.keys(ressource).reduce(
            (formatedRessource, ressourceKey) => {
                const isRelationKey = !!relationConfigs.find(
                    ({ key }) => key === ressourceKey
                )
                if (isRelationKey) {
                    const relationUrls: string[] = ressource[ressourceKey]
                    if (Array.isArray(relationUrls)) {
                        formatedRessource[ressourceKey] = relationUrls.map(
                            (url) => relationsTree[ressourceKey][url]
                        )
                    } else {
                        formatedRessource[ressourceKey] =
                            relationsTree[ressourceKey][relationUrls]
                    }
                } else {
                    formatedRessource[ressourceKey] = ressource[ressourceKey]
                }

                return formatedRessource
            },
            {} as any
        )
    }
}
