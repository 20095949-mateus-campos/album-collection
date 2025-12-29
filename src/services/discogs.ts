class Discogs {
    website = 'https://www.discogs.com/'
    docs = 'https://www.discogs.com/developers/'
    tou = 'https://support.discogs.com/hc/en-us/articles/360009334593-API-Terms-of-Use'
}

export const discogs = new Discogs()

const api = 'https://api.discogs.com/'
const token = import.meta.env.VITE_DISCOGS_TOKEN
const headers = {
    'User-Agent': '20095949-DBS-React-App',
    'Authorization': `Discogs token=${token}`
}

export const getAlbums = async (title?: string, artist?: string, year?: string, genre?: string, country?: string) => {
    let params = ''
    
    if (title && title.length > 0)
        params += `&title=${title}`
    if (artist && artist.length > 0)
        params += `&artist=${artist}`
    if (year && year.length > 0)
        params += `&year=${year}`
    if (genre && genre.length > 0)
        params += `&genre=${genre}`
    if (country && country.length > 0)
        params += `&country=${country}`

    return await fetch(api+'database/search?type=master'+params, {headers: headers})
        .then(res => res.json())
        .then(data => data.results)
        .catch(err => console.error(err))
}

export const getTracks = async (id?: number) => {
    return await fetch(api+'masters/'+id, {headers: headers})
        .then(res => res.json())
        .then(data => data.tracklist)
        .catch(err => console.error(err))
}
