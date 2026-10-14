const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql/schema");

async function createApolloServer(app) {
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    return server;
}

async function createApp() {
    const app = express();

    return app;
}

module.exports = { createApp, createApolloServer };
