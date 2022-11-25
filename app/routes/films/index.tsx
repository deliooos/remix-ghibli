import {LoaderFunction, MetaFunction} from "@remix-run/node"
import {Link, useLoaderData} from "@remix-run/react";
import {Film, getFilms} from "~/api/films";
import {ChangeEvent, useState} from "react";

export const loader: LoaderFunction = async () => {
    return getFilms()
}

export default function FilmsIndex() {
    const films = useLoaderData<Film[]>()

    const [query, setQuery] = useState<string>("")
    const [dateFilter, setDateFilter] = useState<string>("none")
    const [director, setDirector] = useState<string>("")
    const [producer, setProducer] = useState<string>("")

    const directors = Array.from(
        new Set(
            films.map(film => film.director)
        )
    )

    const producers = Array.from(
        new Set(
            films.map(film => film.producer)
        )
    )

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let queryLowerCase = e.target.value.toLowerCase()
        setQuery(queryLowerCase)
    }

    const directorHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setDirector(e.target.value)
    }

    const producerHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setProducer(e.target.value)
    }

    const searchedFilms = films.filter((el:Film) => {
        if ((query === "" && director === "" && producer === "") || (query === "" && director === "default" && producer === "default") || (query === "" && director === "" && producer === "default") || (query === "" && director === "default" && producer === "")) {
            return el
        } else {
            return el.title.toLowerCase().includes(query) && el.director.includes(director) && el.producer.includes(producer)
        }
    })

    function swapDate(): void {
        switch (dateFilter) {
            case 'none':
                setDateFilter("descending")
                break
            case 'descending':
                setDateFilter("ascending")
                break
            case 'ascending':
                setDateFilter("none")
                break
        }
    }

    return (
        <main className="flex flex-col items-center p-16">
            <h1 className="font-bold text-center text-3xl md:text-5xl mb-5">Tous les films <span className="text-indigo-700">Studio Ghibli</span></h1>
            <div className="mb-5 p-5 border-2 border-gray-300 rounded">
                <form>
                    <div className="flex flex-row gap-5">
                        <div className="relative">
                                <input value={query} onChange={searchHandler} type="text" name="search" id="search" className="peer text-sm h-10 p-5 placeholder-transparent border-2 border-gray-300 rounded hover:border-indigo-700 focus:outline-none focus:border-indigo-700 transition-colors" placeholder="Howling Castle"/>
                                <label htmlFor="search" className="absolute left-5 -top-2.5 text-gray-600 text-sm bg-white px-1 cursor-text transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm">Rechercher</label>
                        </div>
                        <div>
                            <button onClick={swapDate} type="button" className="inline-flex items-center gap-1 p-2 text-gray-400 border-2 border-gray-300 rounded hover:border-indigo-700 transition-colors">
                                Date de sortie
                                <i className='bx bxs-sort-alt'></i>
                            </button>
                        </div>
                        <div>
                            <select onClick={directorHandler} name="director" id="director" className="w-[250px] p-2 text-gray-400 bg-transparent border-2 border-gray-300 rounded hover:border-indigo-700 focus:outline-none transition-colors">
                                <option value="default">Directeur</option>
                                {directors.map((director, index) =>
                                    <option key={index} value={director}>{director}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <select onClick={producerHandler} name="director" id="director" className="w-[250px] p-2 text-gray-400 bg-transparent border-2 border-gray-300 rounded hover:border-indigo-700 focus:outline-none transition-colors">
                                <option value="default">Producteur</option>
                                {producers.map((producer, index) =>
                                    <option key={index} value={producer}>{producer}</option>
                                )}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4">
                {searchedFilms.map((film) => (
                    <Link to={`/films/${film.id}`} key={film.id}>
                        <div className="group relative flex justify-center items-center h-[500px] w-[310px] rounded">
                            <figure className="relative h-full w-full rounded overflow-hidden">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
                                    <h5 className="font-bold text-3xl text-white opacity-0 -translate-y-2 group-hover:opacity-80 group-hover:translate-y-0 transition-all">{film.title}</h5>
                                    <small className="text-indigo-700 opacity-0 -translate-y-2 group-hover:opacity-80 group-hover:translate-y-0 transition-all">{film.original_title}</small>
                                </div>
                                <img src={film.image} alt={film.title} className="h-full w-full rounded group-hover:scale-105 transition-transform"/>
                            </figure>
                            <div className="absolute h-full w-full bg-black opacity-0 group-hover:opacity-80 transition-opacity rounded"></div>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    )
}

export const meta: MetaFunction = () => {
    return {
        title: 'Films Studio Ghibli',
        description: 'Voir tous les films produits par le studio Ghibli'
    }
}
