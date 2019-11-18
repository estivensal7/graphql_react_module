import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

//apollo client set up
const client = new ApolloClient({
	uri: "http://localhost:3001/graphql"
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div id="main">
				<h1>Reading List</h1>
				<BookList />
				<AddBook />
			</div>
		</ApolloProvider>
	);
}

export default App;
