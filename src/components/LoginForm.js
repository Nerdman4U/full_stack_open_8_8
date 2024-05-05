import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const LoginForm = (props) => {
  const setToken = props.setToken;
  const setMessage = props.setMessage;
  const setMessageType = props.setMessageType;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
      setMessageType("error");
      setMessage(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (!result.data) return;
    const token = result.data.login.value;
    setToken(token);
    localStorage.setItem("library-user-token", token);
  }, [result.data, setToken]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <table>
          <tbody>
            <tr>
              <td>username</td>
              <td>
                <input
                  type="text"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>password</td>
              <td>
                <input
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
