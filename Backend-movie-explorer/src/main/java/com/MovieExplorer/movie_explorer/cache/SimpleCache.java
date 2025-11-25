package com.MovieExplorer.movie_explorer.cache;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

public class SimpleCache<T> {

    private final Map<String, CacheItem<T>> cache = new HashMap<>();
    private final long expiryMillis;
    private final int maxSize;

    public SimpleCache(long expiryMillis, int maxSize) {
        this.expiryMillis = expiryMillis;
        this.maxSize = maxSize;
    }

    public T get(String key) {
        CacheItem<T> item = cache.get(key);

        if (item == null) return null;

        if (item.isExpired()) {
            cache.remove(key);
            return null;
        }
        return item.value;
    }

    public void put(String key, T value) {
        if (cache.size() >= maxSize) {
            cache.clear();
        }
        cache.put(key, new CacheItem<>(value, Instant.now().toEpochMilli()));
    }

    private class CacheItem<V> {
        V value;
        long timestamp;

        CacheItem(V value, long timestamp) {
            this.value = value;
            this.timestamp = timestamp;
        }

        boolean isExpired() {
            return (Instant.now().toEpochMilli() - timestamp) > expiryMillis;
        }
    }
}