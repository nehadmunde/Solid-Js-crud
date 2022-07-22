const userModel = require("../models/userModel");

class userController {
  static getuserData = async (req, res) => {
    try {
      const userList = await userModel.find();
      res.send(userList);
    } catch (err) {
      console.log(err);
    }
  };

  static createuser = async (req, res) => {
    try {
      let newData = new userModel(req.body);
      let result = await newData.save();
      // console.log("data in result", result);
      res.send("data saved sucessfully");
    } catch (err) {
      res.send(err);
    }
  };

  // edit data
  static edituser = async (req, res) => {
    // console.log(req.params.id);
    try {
      let newData = req.body;
      let result = await userModel.findOne({ _id: req.params.id });
      // console.log(result);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  };

  //update data
  static updateuser = async (req, res) => {
    // console.log("req.params.id", req.params.id);
    // console.log("req.body", req.body);
    try {
      let newData = req.body;
      let result = await userModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            email: req.body.name,
            phone: req.body.phone,
            role: req.body.role,
          },
        }
      );
      // console.log(result);

      res.send("data updated");
    } catch (err) {
      console.log(err);
    }
  };

  //delete data
  static deleteuser = async (req, res) => {
    try {
      let newData = await userModel.deleteOne({ _id: req.params.id });
      res.send(newData);
      // res.send("Data deleted");
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = userController;
