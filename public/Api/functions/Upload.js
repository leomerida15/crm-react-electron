const { app, dialog } = require("electron");
const fs = require("fs");
const path = require("path");
const { getRepository } = require("typeorm");
const ID = require("uuid");

// The function triggered by your button
let i = true;
const File = () => {
  console.clear();

  // Open a dialog to ask for the file path
  const filePath = dialog.showOpenDialogSync({ properties: ["openFile"] })[0];

  const fileName = path.basename(filePath);

  // Copy the chosen file to the application's data path
  fs.copyFileSync(
    filePath,
    path.join(app.getAppPath(), "public/img", fileName)
  );

  const resp = path.join("img", ID.v4() + "@" + fileName.replaceAll(" ", "_"));
  const newPath = path.join(app.getAppPath(), "public", resp);
  fs.renameSync(path.join(app.getAppPath(), "public/img", fileName), newPath);

  return resp;
};

const Files = () => {
  console.clear();

  // Open a dialog to ask for the file path
  const filePaths = dialog.showOpenDialogSync({
    properties: ["openFile", "multiSelections"],
  });

  const resp = filePaths.map((filePath) => {
    const fileName = path.basename(filePath);

    // Copy the chosen file to the application's data path
    fs.copyFileSync(
      filePath,
      path.join(app.getAppPath(), "public/img", fileName)
    );

    const resp = path.join(
      "img",
      ID.v4() + "@" + fileName.replaceAll(" ", "_")
    );
    const newPath = path.join(app.getAppPath(), "public", resp);
    fs.renameSync(path.join(app.getAppPath(), "public/img", fileName), newPath);

    return resp;
  });

  return resp;
};

const Clear = () => {
  console.clear();
  const dir = path.resolve(app.getAppPath(), "public/img");
  fs.readdirSync(dir).map((file) =>
    fs.unlinkSync(path.resolve(app.getAppPath(), "public/img", file))
  );
};

const inputPath = (filePath) => {
  console.log("filePath", filePath);
  // Open a dialog to ask for the file path

  const fileName = path.basename(filePath);

  console.log("fileName", fileName);

  // Copy the chosen file to the application's data path
  fs.copyFileSync(
    filePath,
    path.join(app.getAppPath(), "public/img", fileName)
  );

  const resp = path.join("img", ID.v4() + "@" + fileName.replaceAll(" ", "_"));
  console.log("resp", resp);

  const newPath = path.join(app.getAppPath(), "public", resp);
  console.log("newPath", newPath);

  fs.renameSync(path.join(app.getAppPath(), "public/img", fileName), newPath);

  return resp;
};

const inputPaths = (filePaths) => {
  console.log("filePath", filePaths);
  // Open a dialog to ask for the file path

  const resp = filePaths.map((filePath) => {
    const fileName = path.basename(filePath);

    console.log("fileName", fileName);

    // Copy the chosen file to the application's data path
    fs.copyFileSync(
      filePath,
      path.join(app.getAppPath(), "public/img", fileName)
    );

    const resp = path.join(
      "img",
      ID.v4() + "@" + fileName.replaceAll(" ", "_")
    );
    console.log("resp", resp);

    const newPath = path.join(app.getAppPath(), "public", resp);
    console.log("newPath", newPath);

    fs.renameSync(path.join(app.getAppPath(), "public/img", fileName), newPath);

    return resp;
  });

  return resp;
};

const saveFile = async (prop) => {
  if (!prop) return null;

  if (typeof path === "string") {
    const resp = await getRepository("Imgs").save({ path: prop });

    return resp.id;
  }

  if (Array.isArray(prop)) {
    const paths = prop.map((path) => ({ path }));
    const resp = await getRepository("Imgs").save(paths);

    return resp.map((item) => item.id);
  }
};

module.exports = { File, Files, Clear, inputPath, inputPaths, saveFile };
