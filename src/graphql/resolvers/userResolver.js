const User = require("../../models/User");


const userResolver = {
    Query: {
        users: async () => {
            return await User.find().sort({ createdAt: -1 });
        },
        user: async (_, { id }) => {
            return await User.findById(id);
        }
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            const existUser = await User.findOne({ email: email });
            if (existUser) throw new Error("User already exist");

            const user = new User({ name, email });
            return await user.save();
        },
        updateUser: async (_, { id, name, email }) => {
            const update = {};

            if (name !== undefined) update.name = name;
            if (email !== undefined) {
                const existEmail = await User.findOne({ email: email, _id: { $ne: id } });
                if (existEmail) throw new Error("Email already exist");

                update.email = email;
            }

            return await User.findByIdAndUpdate(id, update, { new: true });
        },
        deleteUser: async (_, { id}) => {
            const res = await User.findByIdAndDelete(id);
            return !!res;
        },
    }
} 

module.exports = userResolver;
