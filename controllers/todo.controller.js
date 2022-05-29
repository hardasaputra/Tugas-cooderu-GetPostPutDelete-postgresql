const req = require("express/lib/request");
const fs = require("fs");
const DATA_FILE = __dirname + "/../models/data.json";

const getToDo = (req, res) => {
  //   console.log("/:id", req.params.id);
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.send({
        message: "Error",
      });
    }
    res.json(JSON.parse(data));
  });
};

const postToDo = (req, res) => {
  const body = req.body;
  let data = fs.readFileSync(DATA_FILE, {});
  data = JSON.parse(data);
  data.push(body);

  fs.writeFile(DATA_FILE, JSON.stringify(data), (err) => {
    if (err) {
      return res.send({
        message: "Error Write File",
      });
    }

    res.json({
      message: "Data successfuly created",
      data: data,
    });
  });
};

const putToDo = (req, res) => {
  //   console.log(req.params.id);
  const body = req.body;
  let data = fs.readFileSync(DATA_FILE, {});
  data = JSON.parse(data);
  let array = [];
  data.forEach((update) => {
    if (update.id == req.params.id) {
      update.id = update.id;
      update.name = body.name;
      update.Status = body.Status;
      array.push(update);
    }
  });
  fs.writeFile(DATA_FILE, JSON.stringify(data), (err) => {
    if (err) {
      return res.send({
        message: "Error write file",
      });
    }
    res.json({
      message: `data with id: ${req.params.id} Updated`,
      data: array,
    });
  });
};

const deleteToDo = (req, res) => {
  let data = fs.readFileSync(DATA_FILE, {});
  data = JSON.parse(data);
  //   console.log(data);
  //   delete data[req.params.id];
  //   data.forEach(clear => {
  //       if(clear.id == req.params.id){
  //           data.splice(clear,1)
  //       }
  //   })
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == req.params.id) {
      data.splice(i, 1);
    }
  }
  fs.writeFile(DATA_FILE, JSON.stringify(data), (err) => {
    if (err) {
      return res.send({
        message: "Eror Deleted Data",
      });
    }
    res.json({
      message: "Data Successfuly Deleted",
      data: data,
    });
  });
};

module.exports = {
  getToDo,
  postToDo,
  putToDo,
  deleteToDo,
};
