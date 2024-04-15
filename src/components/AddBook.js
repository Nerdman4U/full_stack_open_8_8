import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      console.log(error);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");
    addBook({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div className="mt-10 overflow-x-auto">
      <h1 className="text-3xl text-blue-900">Add a new book</h1>
      <form onSubmit={submit}>
        <table className="mb-10">
          <tbody>
            <tr>
              <td>title</td>
              <td>
                <input
                  className="border-2 ml-2"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>author</td>
              <td>
                <input
                  className="border-2 ml-2"
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>published</td>
              <td>
                <input
                  className="border-2 ml-2"
                  type="number"
                  value={published}
                  onChange={({ target }) => setPublished(target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-10">
          <h1 className="text-3xl text-blue-900">Genres</h1>
          <input
            className="border-2 ml-2"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addGenre}
            type="button"
          >
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBook;
