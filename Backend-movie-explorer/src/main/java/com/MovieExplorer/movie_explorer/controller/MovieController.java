package com.MovieExplorer.movie_explorer.controller;

import com.MovieExplorer.movie_explorer.ResponseDto.Response;
import com.MovieExplorer.movie_explorer.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/search")
    public ResponseEntity<Response> getMovies(@RequestParam String title) {
        Response response =movieService.searchMovie(title);
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

    @GetMapping("/details")
    public ResponseEntity<Response> getMovieDetails(@RequestParam String id) {
        Response response=movieService.getMovieDetails(id);
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }



}
