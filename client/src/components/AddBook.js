import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery
} from "../Queries/queries";
import { flowRight as compose } from "lodash";

class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			genre: "",
			authorId: ""
		};
	}

	displayAuthorsLoading() {
		let data = this.props.getAuthorsQuery;

		if (data.loading === true) {
			return <option disabled>Loading Authors...</option>;
		} else {
			return <option>Select Author</option>;
		}
	}

	displayAuthors() {
		let data = this.props.getAuthorsQuery;

		if (data.loading === false) {
			return data.authors.map(author => {
				return (
					<option
						key={author.id}
						value={author.id}
					>
						{author.name}
					</option>
				);
			});
		}
	}

	submitForm(e) {
		e.preventDefault();
		console.log(this.state);
		this.props.addBookMutation({
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				authorId: this.state.authorId
			},
			refetchQueries: [
				{
					query: getBooksQuery
				}
			]
		});
	}

	render() {
		return (
			<form onSubmit={this.submitForm.bind(this)}>
				{/* Book's name input field */}
				<label>Book's Name</label>
				<input
					className="form-control"
					type="text"
					placeholder="Book's name"
					onChange={e => {
						this.setState({
							name: e.target.value
						});
					}}
				/>
				{/* Book's genre input field */}
				<label>Book's Genre</label>
				<input
					className="form-control"
					type="text"
					placeholder="Book's genre"
					onChange={e => {
						this.setState({
							genre: e.target.value
						});
					}}
				/>
				{/* Author dropdown list */}
				<div className="form-group">
					<label>Author</label>
					<select
						className="form-control"
						id="exampleFormControlSelect2"
						onChange={e => {
							this.setState({
								authorId:
									e.target
										.value
							});
						}}
					>
						{this.displayAuthorsLoading()}
						{this.displayAuthors()}
					</select>
				</div>
				{/* Submit Form Button */}
				<button
					className="btn btn-primary"
					type="submit"
					value="Submit"
					style={{
						backgroundColor: "#ad1457",
						border: "none"
					}}
				>
					Add New Book
				</button>
			</form>
		);
	}
}

export default compose(
	graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
	graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
