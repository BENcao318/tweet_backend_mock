const db = require('../models')
const { User } = db
const Op = db.Sequelize.Op
const { hash, compare } = require('bcrypt')

exports.createUser = async (req, res) => {
  const { username, password } = req.body

  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  try {
    const user = await User.findAll({
      where: {
        username: username.toLowerCase(),
      },
    })

    if (user.length !== 0)
      return res.status(403).send({ message: 'Username already exist.' })

    let hashedPassword = await hash(password, 10)

    const userInfo = {
      username: req.body.username.toLowerCase(),
      password: hashedPassword,
    }

    const userData = await User.create(userInfo)

    req.session.user = userData.username

    res.status(200).send({
      success: true,
      message: 'Signup success',
      messge2: null,
      userData,
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User',
    })
  }
}

exports.signIn = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    })

    if (user) {
      const passwordMatched = await compare(password, user.dataValues.password)

      if (passwordMatched) {
        const userData = {
          username: user.dataValues.username,
        }

        req.session.user = userData
        res.status(200).send({
          success: true,
          message: 'Login success',
          messge2: null,
          user: userData,
        })
      } else {
        res.send({
          success: false,
          message: 'Login Failed',
          message2: 'Email and password did not match.',
        })
      }
    } else {
      res.send({
        success: false,
        message: 'Login Failed',
        message2: 'Email and password did not match.',
      })
    }
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving User with email=${email}, ${err}`,
    })
  }
}
