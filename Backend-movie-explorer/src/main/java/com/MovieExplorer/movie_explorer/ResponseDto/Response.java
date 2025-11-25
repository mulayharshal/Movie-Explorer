package com.MovieExplorer.movie_explorer.ResponseDto;


import com.MovieExplorer.movie_explorer.util.Status;

public class Response {

    private Object data;
    private Status status;


    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
