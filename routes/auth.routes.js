const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
      check('email', 'Invalid email').isEmail(),
      check('password', 'Invalid password')
          .isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'Bad request'})
        }

        const {email, password} = req.body

        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message: 'Email is used'})
        }

        const hashedPassword = await bcrypt.hash(password, 20)
        const newUser = new User({email, password: hashedPassword})
        await newUser.save()

        res.status(201).json({message: 'The user is created'})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Invalid password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: 'Bad request'})
            }
            const {email, password} = req.body

            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: 'User not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Wrong password'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})
        } catch (error) {
            res.status(500).json({message: 'Something went wrong, try again'})
        }
})

module.exports = router