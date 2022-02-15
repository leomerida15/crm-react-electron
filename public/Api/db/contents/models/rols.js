module.exports = async () => {
  try {
    const N_rols = await getRepository("Rols").count();
    //
    if (!N_rols) {
      await getRepository("rols").save([
        { name: "client", id: 1, description: "" },
        { name: "admin", id: 2, description: "" },
      ]);
    }
  } catch (err) {
    console.log(err);
  }
};
