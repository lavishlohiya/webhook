// Load environment variables from .env file
require("dotenv").config();

const app = require("./src/app");

// Define server port from environment or fallback to 3000
const PORT = process.env.PORT || 3000;

// Start the HTTP server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});