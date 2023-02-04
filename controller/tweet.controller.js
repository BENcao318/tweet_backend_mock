const db = require('../models')
const { Tweet, User } = db
const Op = db.Sequelize.Op

exports.createTweet = async (req, res) => {
  const { title, content } = req.body

  try {
    const user = await User.findOne({
      raw: true,
      where: {
        username: req.session.user.username,
      },
    })

    const user_id = user.id

    const tweetData = await Tweet.create({
      title: title,
      content: content,
      user_id: user_id,
    })

    res.status(200).send({
      success: true,
      message: 'Tweet create success',
      messge2: null,
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Tweet',
    })
  }
}

//find all the tweets from user
exports.findTweet = async (req, res) => {
  const { username } = req.query

  const userData = await User.findOne({
    raw: true,
    where: {
      username,
    },
  })

  const tweetData = await Tweet.findAll({
    raw: true,
    where: {
      user_id: userData.id,
    },
    attributes: ['title', 'content', 'createdAt', 'updatedAt'],
  })

  res.status(200).send({
    success: true,
    message: 'Successfully find the tweet with given username',
    messge2: null,
    tweetData,
  })
}

exports.updateTweet = async (req, res) => {
  const { tweet_id, title, content } = req.body

  try {
    const updatedTweetData = await Tweet.update(
      {
        title,
        content,
      },
      {
        where: { id: tweet_id },
      }
    )

    res.status(200).send({
      success: true,
      message: 'Successfully updated the tweet',
      messge2: null,
      updatedTweetData,
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Task',
    })
  }
}

exports.deleteTweet = async (req, res) => {
  const { tweet_id } = req.body

  if (!req.session.user) {
    return res.status(500).send({
      success: false,
      message: 'User is not authenticated to delete',
      messge2: null,
    })
  }

  try {
    const tweetData = await Tweet.findOne({
      where: {
        id: tweet_id,
      },
    })
    await tweetData.destroy()

    res.status(200).send({
      success: true,
      message: 'Successfully delete the tweet',
      messge2: null,
    })
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
}
