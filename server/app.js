// Dependencies
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

// Start server
app.listen(PORT, error => {
	if (error) res.status(500).send(res.json(error));

	console.log(`Server listening on PORT: ${PORT}`);
});
