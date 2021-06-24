const express = require('express').Router
const router = express()
const User = require('../models/User')


const index = async (req,res) => {
    try {
        let users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(400).send("Server Error")
    }
}

const show = async (req,res) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user)
            return res.status(404).json({msg: "User not found"})
        
        return res.status(200).send(user)
    } catch (err) {
        console.log(err)
        res.status(400).send("Server Error")
    }
}

const store = async (req,res) => {
    try {
        let user = new User(req.body)
        await user.save()
        res.status(200).send(user)
    } catch (err) {
        console.log(err)
        res.status(400).send("Server Error")
    }
}

const update = async (req,res) => {
    try {
        const { name, email, password } = req.body 
        let user = await User.findById(req.params.id)

        if (!user) 
            return res.status(404).json({ msg: "User not found" })
        
        user = { name, email, password }
        user = await User.findOneAndUpdate({_id: req.params.id}, user, {new: true})
        
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(400).send("Server Error")
    }
}

const destroy = async (req,res) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user) 
            return res.status(404).json({msg: "User not found"})
        
        await user.delete()
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(400).send("Server Error")
    }
}

router.get('/', index)
    .post('/', store)
    .get('/:id', show)
    .put('/:id', update)
    .delete('/:id', destroy)
    

module.exports = router