import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Select from "react-select";

const ALL_AUTHORS = gql`
  query {
    allAuthors(hasBooks: YES) {
      name
      born
      bookCount
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const Authors = () => {
  const [born, setBorn] = useState("");
  const [selected, setSelected] = useState(null);

  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
    },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }
  if (!result.data) {
    console.log("result:", result);
    return <div>no data</div>;
  }
  const authors = result.data.allAuthors;

  const handleSubmit = (e) => {
    e.preventDefault();
    editAuthor({
      variables: { name: selected.value, setBornTo: born },
    });
  };

  return (
    <div className="overflow-x-auto mt-10">
      <h2 className="text-3xl text-blue-900">Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td className="pl-0">{a.name}</td>
              <td className="pl-3">{a.born}</td>
              <td className="pl-3">{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 min-h-96">
        <h2 className="text-3xl text-blue-900">Set birthyear</h2>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>author</td>
                <td>
                  <Select
                    className="ml-2"
                    value={selected}
                    onChange={setSelected}
                    options={authors.map((a) => ({
                      value: a.name,
                      label: a.name,
                    }))}
                  />
                </td>
              </tr>
              <tr>
                <td>born</td>
                <td>
                  <input
                    className="border-2 ml-2"
                    type="number"
                    value={born}
                    onChange={({ target }) => setBorn(Number(target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    type="submit"
                    value="update author"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default Authors;
