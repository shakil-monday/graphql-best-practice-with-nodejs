const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql/schema");

async function createApp() {
    const app = express();

    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    return app;
}

module.exports = createApp;
