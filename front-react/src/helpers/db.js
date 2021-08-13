import axios from "axios";

export async function addOffer(offer) {
  let success = false;
  await axios
    .post(
      "http://localhost:5000/addOffer",
      JSON.stringify({
        offer,
      }),
      {
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => (success = true))
    .catch((err) => {});
  return success;
}
