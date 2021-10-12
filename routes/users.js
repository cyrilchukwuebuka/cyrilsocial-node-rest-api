const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Update User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (e) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

//Delete User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted successfully");
    } catch (e) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

//Get a User
router.get("/:id", async (res, req) => {
  try {
    const user = await User.findById(req.params.id);
    const {password, updatedAt, ...other} = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Follow a User
router.put('/:id/follow', async(res, req) => {
  if(req.body.userId !== req.params.id){
    try{
      const user = await User.findById(req.params.id);
      const currentUser = await user.findById(req.body.userId);

      if(!user.followers.includes(req.body.userId)){
         await user.updatedOne({$push: {followers: req.body.userId}})
         await curentUser.updatedOne({$push: {followerings: req.params.id}})
         res.status(200).json("user has been followed")
      } else {
        res.status(403).json("You already follow the user")
      }
    } catch {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json("You cannot follow yourself")
  }
})

//Unfollow a User

router.get("/", (req, res) => {
  res.send("Welcome to user route page");
});

module.exports = router;
