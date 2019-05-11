//  Dependencies
const graphql = require("graphql");

//  Describing object types

// Grabbing variables from graphql using destructuring
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// defining book type
const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});

//  defining our Root Query
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLString }
			},
			resolve(parent, args) {
				//code to get data from db / other source
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
