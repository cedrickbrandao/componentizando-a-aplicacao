import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "./services/api";

interface AppContextProps {
    children: ReactNode;
}

export interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

export interface MovieProps {
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}

interface AppProviderData {
    selectedGenreId: number;
    genres: GenreResponseProps[];
    movies: MovieProps[];
    selectedGenre: GenreResponseProps;
    handleClickButton: (id: number) => void;
}

const AppContext = createContext<AppProviderData>({} as AppProviderData);

export function AppProvider({ children }: AppContextProps) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (

        <AppContext.Provider
            value={{
                selectedGenreId,
                genres,
                movies,
                selectedGenre,
                handleClickButton
            }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext);
    return context;
}