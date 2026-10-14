require("dotenv").config();
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const { createApp, createApolloServer } = require("./app");
const connectDB = require("./config/db");
const { typeDefs, resolvers } = require("./graphql/schema");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const PORT = process.env.PORT || 5001;

(async () => {
    await connectDB();
    const app = await createApp();

    const httpServer = createServer(app);

    const apolloServer = await createApolloServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
            onConnect: () => {
                console.log("Client connected for Subscriptions");
            },
            onDisconnect: () => {
                console.log("Client disconnected form Subscriptions");
            }
        },
        {
            server: httpServer,
            path: "/graphql",
        }
    );


    httpServer.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}/graphql`);
    });
})();