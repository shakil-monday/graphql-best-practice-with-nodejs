require("dotenv").config();
const createApp = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5001;

(async () => {
    await connectDB();
    const app = await createApp();

    app.listen(PORT, ()=>{
        console.log(`Server ready at http://localhost:${PORT}/graphql`);
    });
})();