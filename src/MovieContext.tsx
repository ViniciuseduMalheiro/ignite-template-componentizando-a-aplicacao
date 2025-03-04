import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../src/services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MoviesProviderProps {
  children: ReactNode
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MovieContextData{
  genres: GenreResponseProps[];
  selectedGenreId:Number;
  selectedGenre:GenreResponseProps;
  handleClickButton:(id: number) => void;
  movies:MovieProps[];
}



const MovieContext = createContext<MovieContextData>({} as MovieContextData)

export function MoviesProvider({children}:MoviesProviderProps) {
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
    <MovieContext.Provider value={{genres, selectedGenreId, selectedGenre, handleClickButton, movies}}>
      {children}
    </MovieContext.Provider>
  )

}

export function useMovies() {
  const context = useContext(MovieContext)

  return context;
}