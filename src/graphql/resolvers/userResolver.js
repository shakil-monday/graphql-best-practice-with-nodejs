const userResolver = {
    Query: {
        getUser: () => {
            return {
                name: 'Static User',
            };
        },
    },
    Mutation: {
        createUser: (_, { name }) => {
            return {
                name
            }
        },
    }
}

module.exports = userResolver;
