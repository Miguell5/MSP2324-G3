package com.api.api.utils;


import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.HashMap;
import java.util.Map;


public class MongoClient {

    private static final String HOST = "db";
    private static final int PORT = 27017;
    private static final String DATABASE_NAME = "database";
    private static MongoDatabase database;
    private static final Map<MongoCollections,MongoCollection<Document>> collectionMap = new HashMap<>();

    public static synchronized MongoCollection<Document> getCollection(MongoCollections collection) {

        if (database == null) {
            String connectionString = String.format("mongodb://root:msp2324@%s:%d/", HOST, PORT);
            ConnectionString connString = new ConnectionString(connectionString);

            MongoClientSettings settings = MongoClientSettings.builder()
                    .applyConnectionString(connString)
                    .build();

            database = MongoClients.create(settings).getDatabase(DATABASE_NAME);
        }

        if (!collectionMap.containsKey(collection)) {
            collectionMap.put(collection,database.getCollection(collection.getValue()));
        }

        return collectionMap.get(collection);

    }
}