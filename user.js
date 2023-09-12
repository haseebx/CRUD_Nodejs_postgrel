const { Pool } = require("pg");


//connection with the database pgAdmin
const pool = new Pool({
  host: "localhost",
  port: "5432",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "user-api-Test",
});



const createUser = (req, res) => {
  const { name, email } = req.body;
  console.log("req body", req.body);
  pool.query(
    "INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *",
    [name, email],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(200).json({
        msg: "data inserted success",
        data: result.rows[0],
      });
    }
  );
};

const getAllUser = (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json({
      //   msg: "data recve success",
      data: result.rows,
    });
  });
};
const getUserbyid = (req, res) => {
  let id = parseInt(req.params.id);
  pool.query("SELECT * FROM users WHERE id = $1", [id], (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json({
      //   msg: "data recve success",
      data: result.rows,
    });
  });
};
const updateUserbyid = (req, res) => {
  let id = parseInt(req.params.id);
  const { name, email } = req.body;
  pool.query(
    "UPDATE users SET name=$1, email =$2 WHERE id =$3",
    [name, email, id],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(200).json({
        //   msg: "data recve success",
        data: "Updated That Id",
      });
    }
  );
};

const deleteUserbyid = (req, res) => {
  let id = parseInt(req.params.id);
  pool.query("DELETE FROM users WHERE id=$1", [id], (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json({
      //   msg: "data recve success",
      data: "Deleted That Id",
    });
  });
};

module.exports = {
  createUser,
  getAllUser,
  getUserbyid,
  updateUserbyid,
  deleteUserbyid
};
