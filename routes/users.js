const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//Update User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      await User.findByIdAndUpdate(req.body.userId, {
        $set: req.body,
      });
      res.status(200).json("you are succesfully updated your account!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can only update your account !");
  }
});

//Delete User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.body.userId);
      res.status(200).json("your account succesfully deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).send("you can delete only your account");
  }
});

//Get User
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId ?  await User.findById(userId) : 
    await User.findOne({username : username});
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).send(other);
  } catch (error) {
    res.status(500).json(err);
  }
});

//Follow User
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can not follow yourself");
  }
});

//Unfollow User
router.put("/:id/unfollow", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("you are succesfully unfollow account");
      } else {
        res.status(403).json("You dont follow this account");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cant unfollow yourself");
  }
});

module.exports = router;
