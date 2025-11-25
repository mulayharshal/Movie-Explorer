package com.MovieExplorer.movie_explorer.serviceImpl;

import com.MovieExplorer.movie_explorer.ResponseDto.Response;
import com.MovieExplorer.movie_explorer.cache.SimpleCache;
import com.MovieExplorer.movie_explorer.service.MovieService;
import com.MovieExplorer.movie_explorer.util.Status;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class MovieServiceImpl implements MovieService {

    @Value("${omdb.api.key}")
    private String apiKey;

    private final SimpleCache<Object> cache =
            new SimpleCache<>(300000, 100);

    private final RestTemplate restTemplate = new RestTemplate();


    @Override
    public Response searchMovie(String title) {
        if (title == null || title.trim().isEmpty()) {
            Response response=new Response();
            response.setData("Title cannot be empty");
            response.setStatus(Status.EXCEPTION);
            return response;
        }


        String cacheKey = "search_" + title.toLowerCase();

        Object cached = cache.get(cacheKey);
        if (cached != null) {
            Response response = new Response();
            response.setData(cached);
            response.setStatus(Status.SUCCESS);
            return response;
        }

        String url = "https://www.omdbapi.com/?apikey=" + apiKey + "&s=" + title;
        Object res = restTemplate.getForObject(url, Object.class);

        Map map = (Map) res;
        if ("False".equals(map.get("Response"))) {
            Response response = new Response();
            response.setData(map.get("Error"));
            response.setStatus(Status.EXCEPTION);
            return response;
        }

        cache.put(cacheKey, res);
        Response response = new Response();
        response.setData(res);
        response.setStatus(Status.SUCCESS);
        return response;
    }

    @Override
    public Response getMovieDetails(String id) {

        if (id == null || id.trim().isEmpty()) {
            Response response=new Response();
            response.setData("ID cannot be empty");
            response.setStatus(Status.EXCEPTION);
            return response;
        }


        String cacheKey = "details_" + id;
        Object cached = cache.get(cacheKey);
        if (cached != null) {
            Response response = new Response();
            response.setData(cached);
            response.setStatus(Status.SUCCESS);
            return response;
        }

        String url = "https://www.omdbapi.com/?apikey=" + apiKey + "&i=" + id;
        Object res = restTemplate.getForObject(url, Object.class);

        Map map = (Map) res;
        if ("False".equals(map.get("Response"))) {
            Response response = new Response();
            response.setData(map.get("Error"));
            response.setStatus(Status.EXCEPTION);
            return response;
        }

        cache.put(cacheKey, res);
        Response response = new Response();
        response.setData(res);
        response.setStatus(Status.SUCCESS);
        return response;
    }


}

