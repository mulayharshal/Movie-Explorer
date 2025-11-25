package com.MovieExplorer.movie_explorer.service;

import com.MovieExplorer.movie_explorer.ResponseDto.Response;

public interface MovieService {
    Response searchMovie(String title);

    Response getMovieDetails(String id);

}
