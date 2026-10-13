const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const userResolver = {
    Query: {
        users: async (_, __, { user }) => {
            console.log(user)
            if (!user) throw new Error("Unauthorized");
            return await User.find().sort({ createdAt: -1 });
        },
        user: async (_, { id }, { user }) => {
            console.log(user)
            if (!user) throw new Error("Unauthorized");
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
        updateUser: async (_, { id, name, email }, { user }) => {
            const update = {};

            if (name !== undefined) update.name = name;
            if (email !== undefined) {
                const existEmail = await User.findOne({ email: email, _id: { $ne: id } });
                if (existEmail) throw new Error("Email already exist");

                update.email = email;
            }

            return await User.findByIdAndUpdate(id, update, { new: true });
        },
        deleteUser: async (_, { id }) => {
            const res = await User.findByIdAndDelete(id);
            return !!res;
        },
        registerUser: async (_, { name, email, password }) => {
            const existUser = await User.findOne({ email: email });
            if (existUser) throw new Error("Email already registered");

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();

            var token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });

            return {
                token,
                user: newUser,
            };
        },
        loginUser: async (_, { email, password }) => {
            const existUser = await User.findOne({ email: email });
            if (!existUser) throw new Error("User not found.");

            const isMatchedPassword = await bcrypt.compare(password, existUser.password);

            if (!isMatchedPassword) {
                throw new Error("Invalid credentails");
            }

            var token = jwt.sign({ userId: existUser.id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });

            return {
                token,
                user: existUser,
            };
        },
    }
}

module.exports = userResolver;
