import {LoaderFunction, MetaFunction} from "@remix-run/node"
import {Link, useLoaderData} from "@remix-run/react";
import {Film, getFilms} from "~/api/films";

export const loader: LoaderFunction = async () => {
    return getFilms()
}

export default function FilmsIndex() {
    const films = useLoaderData<Film[]>()

    return (
        <main className="flex flex-col items-center p-16">
            <h1 className="font-bold text-center text-3xl md:text-5xl mb-5">Tous les films <span className="text-indigo-700">Studio Ghibli</span></h1>
            <div className="mb-5 p-5 border-2 border-gray-300 rounded">
                <form>
                    <div className="relative">
                        {/*TODO Change label position*/}
                        <input type="text" name="search" id="search" className="peer h-10 p-3 placeholder-transparent border-2 border-gray-300 rounded focus:outline-none focus:border-indigo-700 transition-colors" placeholder="Howling Castle"/>
                        <label htmlFor="search" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm">Rechercher</label>
                    </div>
                </form>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4">
                {films.map((film) => (
                    <Link to={`/films/${film.id}`} key={film.id}>
                        <div className="group relative flex justify-center items-center h-[500px] w-[310px] rounded">
                            <figure className="relative h-full w-full  rounded">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
                                    <h5 className="font-bold text-3xl text-white opacity-0 group-hover:opacity-80 transition-opacity">{film.title}</h5>
                                    <small className="text-indigo-700 opacity-0 group-hover:opacity-80 transition-opacity">{film.original_title}</small>
                                </div>
                                <img src={film.image} alt={film.title} className="h-full w-full  rounded"/>
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
