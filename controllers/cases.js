const express = require('express').Router
const router = express()
const Case = require('../models/Case')


const index = async (req,res) => {
    try {
        let cases = await Case.find();
        res.status(200).json(cases)
    } catch (err) {
        console.log(err)
        res.status(400).send("Server Error")
    }
}

const show = async (req,res) => {
    try {
        let case_ = await Case.findById(req.params.id)
        if (!case_)
            return res.status(404).json({msg: "Case not found"})
        
        return res.status(200).send(case_)
    } catch (err) {
        console.log(err)
        res.status(400).send("Server Error")
    }
}

const store = async (req,res) => {
    try {
        let case_ = new Case(req.body)
        await case_.save()
        res.status(200).send(case_)
    } catch (err) {
        console.log(err)
        res.status(400).send("Server Error")
    }
}

const update = async (req,res) => {
    try {
        const { user_id, description, location, latitude, longitude } = req.body 
        let case_ = await Case.findById(req.params.id)

        if (!case_) 
            return res.status(404).json({ msg: "Case not found" })
        
        case_ = { user_id, description, location, latitude, longitude }
        case_ = await Case.findOneAndUpdate({_id: req.params.id}, case_, {new: true})
        
        res.status(200).json(case_)
    } catch (err) {
        console.log(err)
        res.status(400).send("Server Error")
    }
}

const destroy = async (req,res) => {
    try {
        let case_ = await Case.findById(req.params.id)
        if (!case_) 
            return res.status(404).json({msg: "Case not found"})
        
        await case_.delete()
        res.json(case_)
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