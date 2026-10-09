const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            // useNewUrlParse: true,
            // useUnifiedTopology: true,
        });

        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("DB Connection error: ", error)
        process.exit(1);
    }
}


module.exports = connectDB;