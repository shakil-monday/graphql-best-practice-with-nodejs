const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql/schema");
const authMiddleware = require("./middleware/auth");

async function createApp() {
    const app = express();

    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        context: ({ req }) => {
            const user = authMiddleware(req);

            // console.log("user: ", user);

            return { user };
        }
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    return app;
}

module.exports = createApp;
