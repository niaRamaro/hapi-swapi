export enum RESSOURCES {
    FILMS = 'films',
    PEOPLE = 'people',
    PLANETS = 'planets',
    SPECIES = 'species',
    STARSHIPS = 'starships',
    VEHICLES = 'vehicles'
}

export type Relation = { key: string; type: RESSOURCES }

export const RELATIONS: {
    [key in RESSOURCES]: Relation[]
} = {
    [RESSOURCES.FILMS]: [
        {
            key: 'characters',
            type: RESSOURCES.PEOPLE
        },
        {
            key: 'planets',
            type: RESSOURCES.PLANETS
        },
        {
            key: 'starships',
            type: RESSOURCES.STARSHIPS
        },
        {
            key: 'vehicles',
            type: RESSOURCES.VEHICLES
        },
        {
            key: 'species',
            type: RESSOURCES.SPECIES
        }
    ],
    [RESSOURCES.PEOPLE]: [
        {
            key: 'films',
            type: RESSOURCES.FILMS
        },
        {
            key: 'planets',
            type: RESSOURCES.PLANETS
        },
        {
            key: 'starships',
            type: RESSOURCES.STARSHIPS
        },
        {
            key: 'vehicles',
            type: RESSOURCES.VEHICLES
        },
        {
            key: 'species',
            type: RESSOURCES.SPECIES
        }
    ],
    [RESSOURCES.PLANETS]: [
        {
            key: 'films',
            type: RESSOURCES.FILMS
        },
        {
            key: 'residents',
            type: RESSOURCES.PEOPLE
        }
    ],
    [RESSOURCES.SPECIES]: [
        {
            key: 'people',
            type: RESSOURCES.PEOPLE
        },
        {
            key: 'films',
            type: RESSOURCES.FILMS
        }
    ],
    [RESSOURCES.STARSHIPS]: [
        {
            key: 'films',
            type: RESSOURCES.FILMS
        },
        {
            key: 'pilots',
            type: RESSOURCES.PEOPLE
        }
    ],
    [RESSOURCES.VEHICLES]: [
        {
            key: 'films',
            type: RESSOURCES.FILMS
        },
        {
            key: 'pilots',
            type: RESSOURCES.PEOPLE
        }
    ]
}
