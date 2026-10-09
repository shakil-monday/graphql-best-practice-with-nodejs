const express = require("express");
const { ApolloServer } = require("apollo-server-express");

async function createApp() {
    const app = express();

    const server = new ApolloServer({
        // typeDefs,
        // resolvers,
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    return app;
}

module.exports = createApp;
