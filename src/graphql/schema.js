const {gql} = require("apollo-server-express");
const userType = require("./typeDefs/userType");
const userResolver = require('./resolvers/userResolver');

// Base/root type
const baseTypeDefs = gql`
    type Query
    type Mutation
`;

const typeDefs = [baseTypeDefs, userType];
const resolvers = [userResolver];

module.exports = {
    typeDefs,
    resolvers,
};
