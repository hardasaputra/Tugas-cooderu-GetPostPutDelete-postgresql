const req = require("express/lib/request");
const fs = require("fs");
const db = require("../config/db");
const DATA_FILE = __dirname + "/../models/data.json";

// const getToDo = (req, res) => {
//   //   console.log("/:id", req.params.id);
//   fs.readFile(DATA_FILE, "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.send({
//         message: "Error",
//       });
//     }
//     res.json(JSON.parse(data));
//   });
// };
const getToDo = async (req, res) => {
  await db
    .query("select * from todos")
    .then((result) => {
      res.status(200).json({
        data: result.rows,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    });
};

// const postToDo = (req, res) => {
//   const body = req.body;
//   let data = fs.readFileSync(DATA_FILE, {});
//   data = JSON.parse(data);
//   data.push(body);

//   fs.writeFile(DATA_FILE, JSON.stringify(data), (err) => {
//     if (err) {
//       return res.send({
//         message: "Error Write File",
//       });
//     }

//     res.json({
//       message: "Data successfuly created",
//       data: data,
//     });
//   });
// };

const postToDo = async (req, res) => {
  const body = req.body;

  await db
    .query(
      `insert into todos(name, done) values ('${body.name}', ${body.done})`
    )
    .then((result) => {
      res.status(200).json({
        message: "Todo successfully created",
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    });
};

// const putToDo = (req, res) => {
//   //   console.log(req.params.id);
//   const body = req.body;
//   let data = fs.readFileSync(DATA_FILE, {});
//   data = JSON.parse(data);
//   let array = [];
//   data.forEach((update) => {
//     if (update.id == req.params.id) {
//       update.id = update.id;
//       update.name = body.name;
//       update.Status = body.Status;
//       array.push(update);
//     }
//   });
//   fs.writeFile(DATA_FILE, JSON.stringify(data), (err) => {
//     if (err) {
//       return res.send({
//         message: "Eror Updated Data",
//       });
//     }
//     res.json({
//       message: "Data Successfuly Updated",
//       data: array,
//     });
//   });
// };

const putToDo = async (req, res) => {
  const body = req.body;
  // console.log(req.params.id);

  await db
    .query(
      `update todos set "name" = '${body.name}', done = '${body.done}' where id = '${req.params.id}'`
    )
    .then(
      res.status(200).json({
        message: "Todo successfully updated",
      })
    )
    .catch((e) => {
      console.log(e);
      res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    });
};

// const deleteToDo = (req, res) => {
//   let data = fs.readFileSync(DATA_FILE, {});
//   data = JSON.parse(data);
//   for (let i = 0; i < data.length; i++) {
//     if (data[i].id == req.params.id) {
//       data.splice(i, 1);
//     }
//   }
//   fs.writeFile(DATA_FILE, JSON.stringify(data), (err) => {
//     if (err) {
//       return res.send({
//         message: "Eror Deleted Data",
//       });
//     }
//     res.json({
//       message: "Data Successfuly Deleted",
//       data: data,
//     });
//   });
// };

const deleteToDo = async (req, res) => {
  const body = req.body;

  await db
    .query(`delete from todos where id = '${req.params.id}'`)
    .then(
      res.status(200).json({
        message: "Todo successfully deleted",
      })
    )
    .catch((e) => {
      console.log(e);
      res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    });
};

module.exports = {
  getToDo,
  postToDo,
  putToDo,
  deleteToDo,
};
