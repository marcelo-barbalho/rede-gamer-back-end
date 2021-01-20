const express = require('express');
const Games = require('../../models/games');
const auth = require('../../middleaware/auth')
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const MSGS = require('../../messages')

// @route    GET /game/:userId
// @desc     DETAIL game
// @access   Private
router.get('/:gameId', auth, async (req, res, next) => {
  try {
    const id = req.params.gameId
    const game = await Games.findOne({_id : id})
    if (game) {
      res.json(game)
    } else {
      res.status(404).send({ "error": MSGS.GAME404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})

// @route    DELETE /game/:gameId
// @desc     DELETE game
// @access   Private
router.delete('/:gameId', auth, async(req, res, next) => {
  try {
    const id = req.params.gameId
    const game = await Games.findOneAndDelete({_id : id})
    if (game) {
      res.json(game)
    } else {
      res.status(404).send({ "error": MSGS.GAME404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})

// @route    PATCH /game/:gameId
// @desc     PARTIAL EDIT game
// @access   Private
router.patch('/:gameId', auth, async (request, res, next) => {
  try {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() })
      return
    }
    const id = request.params.gameId
    
    let bodyRequest = request.body
    const update = { $set: bodyRequest }
    const game = await Games.findByIdAndUpdate(id, update, { new: true })
    if (game) {
      res.send(game)
    } else {
      res.status(404).send({ error: MSGS.GAME404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})

// @route    GET /game
// @desc     LIST game
// @access   Private
router.get('/', auth, async (req, res, next) => {
  try {
    const game = await Games.find({})
    res.json(game)
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})

// @route    POST /game
// @desc     CREATE game
// @access   Private
router.post('/', [
  check('title').not().isEmpty(),check('category').not().isEmpty(),check('description').not().isEmpty(),
  check('complete_description').not().isEmpty(),check('game_proficiency').not().isEmpty()
], auth, async (req, res, next) => {
  try {
    let { title, category, description, complete_description, most_played, gajme_proficiency, learning, teaching, open_random_party} = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } else {
      let game = new Games(req.body)

      await game.save()
      if (game.id) {
        res.json(game);
      }
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})


module.exports = router;