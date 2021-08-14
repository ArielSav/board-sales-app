import axios from "axios";

export async function handleAuth(props) {
  const { type, userName, password } = props;
  let auth = false;
  await axios
    .post(
      `http://localhost:5000/${type}`,
      JSON.stringify({
        username: userName,
        password,
      }),
      {
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      auth = true;
    })
    .catch((err) => console.log(err));
  return auth;
}

export async function logout() {
  await axios
    .get("http://localhost:5000/logout", {
      withCredentials: true,
      credentials: "include",
    })
    .then((res) => {})
    .catch((err) => {});
}
