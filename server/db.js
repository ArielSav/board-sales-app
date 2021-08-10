const mongodb = require("mongodb");

const client = new mongodb.MongoClient("mongodb://localhost:27017");

async function getUser(username) {
  try {
    await client.connect();
    return await client
      .db("board_sales")
      .collection("users")
      .findOne({ username: username });
  } catch (err) {
    return {
      error: err,
    };
  } finally {
    client.close();
  }
}

// Takes a username and password as arguments
// If user is already registered with the username or a problem has occured
// Returns an object containing the error
// Otherwise, adding it to the mongoDB
exports.addUser = async (username, pass) => {
  try {
    const user = await getUser(username);
    await client.connect();
    if (user) {
      return {
        error: "username is taken",
      };
    }
    const newUser = await client
      .db("board_sales")
      .collection("users")
      .insertOne({
        username: username,
        password: pass,
      });
    return {
      message: "user has succesfuly added",
      id: newUser._id,
    };
  } catch (err) {
    return {
      error: err,
    };
  } finally {
    client.close();
  }
};

exports.getUser = getUser;
