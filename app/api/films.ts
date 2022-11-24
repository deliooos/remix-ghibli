export type Film = {
    id: string,
    title: string,
    original_title: string,
    description: string,
    image: string,
    movie_banner: string,
    director: string,
    producer: string,
    release_date: number
}

export async function getFilms() {
    const response = await fetch('https://ghibliapi.herokuapp.com/films')

    const films: Film[] = await response.json()

    return films
}