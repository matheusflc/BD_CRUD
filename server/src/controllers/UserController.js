import User from "../models/User.js";

async function getUsers(request, response) {
  const users = await User.find();

  console.log(JSON.stringify(users, undefined, 2));

  return response.status(200).json(users);
}

async function createUser(request, response) {
  const user = request.body;

  const newUser = await User.create(user);

  return response.status(201).json(newUser);
}

async function deleteUser(request, response) {
  const id = request.params.id;

  await User.findByIdAndDelete({ _id: id });

  return response.status(200).json({ response: "User deleted" });
}

async function updateUser(request, response) {
  const id = request.params.id;

  const update = request.body;

  console.log(JSON.stringify(update, undefined, 2));

  await User.findByIdAndUpdate({ _id: id }, update);

  return response.status(200).json({ response: "User updated" });
}

async function findByName(request, response) {
  try {
    const name = request.body.name;

    const user = await User.findOne({ name: name });

    if (!user) {
      console.log("Usuário não encontrado");
      return response.status(404).json({ error: "User not found" });
    }

    console.log(JSON.stringify(user, undefined, 2));

    return response.status(200).json(user);
  } catch (error) {
    console.error("Error in findByName:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}

async function report(request, response) {
  const [{ totalUsers }] = await User.aggregate([
    { $group: { _id: null, totalUsers: { $sum: 1 } } },
  ]);

  console.log([{ totalUsers }]);

  return response.status(200).json([{ totalUsers }]);
}

export { getUsers, createUser, deleteUser, updateUser, findByName, report };
