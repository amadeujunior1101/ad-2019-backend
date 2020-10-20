const User = require("../../../Models/User");

const transporter = require("../../../Config/mail");

module.exports = {
  async index(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (user) return res.json(user);
    return res.json({ message: "User not exists" });
  },

  async store(req, res) {
    const { name, email, friend } = req.body;

    try {
      if (await User.findOne({ email: email }))
        return res
          .status(200)
          .json({ error: true, message: "User already exists" });

      await User.create({
        name: name,
        email: email,
        friend: friend,
      });

      const usersAll = await User.find();

      return res.json({ error: false, users: usersAll });
    } catch (error) {
      return res
        .status(400)
        .json({ error: true, message: "Registration failed" });
    }
  },

  async show(req, res) {
    const users = await User.find();

    return res.json({ users: users, error: false });
  },

  // async update(req, res) {
  //   const { _id, name } = req.body;

  //   try {
  //     await User.updateOne(
  //       { _id: _id },
  //       {
  //         $set: {
  //           name: name,
  //         },
  //       }
  //     );
  //     return res.status(200).json({ message: "user updated successfully" });
  //   } catch (error) {
  //     return res.status(400).json({ error: "updated failed" });
  //   }
  // },

  async delete(req, res) {
    const _id = req.query["id"];

    try {
      await User.deleteMany({ _id: _id });

      const users = await User.find();

      return res
        .status(200)
        .json({
          message: "user deleted successfully",
          error: false,
          info: users,
        });
    } catch (error) {
      return res.status(400).json({ error: "deleted failed" });
    }
  },

  async sendEmail(req, res) {
    let arr = [{}];
    arr = req.body;

    try {
      arr.forEach(async (item) => {
        const message = {
          from: "secret-friend@gmail.com",
          to: item.email,
          subject: "Descubra seu amigo secreto",
          text: `Seu amigo secreto é: ${item.friend}`,
        };

        transporter.sendMail(message).then(() => {});

        await User.updateOne(
          { _id: item._id },
          {
            $set: {
              friend: item.friend,
            },
          }
        );
      });

      const users = await User.find();

      return res.status(200).json({
        message: "Emails successfully sent",
        error: false,
        users: users,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ error: true, message: "Registration failed" });
    }
  },
};
