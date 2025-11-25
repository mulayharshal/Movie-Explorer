import api from "./api";


export const SearchMovies = async (query) => {
  try {
    const response = await api.get(`/movies/search?title=${query}` );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const movieDetails = async (id) => {
  try {
    const response = await api.get(`/movies/details?id=${id}` );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};