const express = require('express')
const router = express.Router()
const Network = require('../models/network')


//Busca todos os dados do mongo
router.get('/', async (req, res)=>{
    try {
        const networks = await Network.find()
        res.json(networks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//Busca no mongo pelo id
router.get('/:id', getNetworkID, (req, res)=>{
    res.json(res.network)
})

//Insere dados no banco do mongo
router.post('/', async (req, res)=>{
    const network = new Network({
        userName: req.body.userName,
        userDesc: req.body.userDesc,
        userOrgs: req.body.userOrgs,
        userNos: req.body.userNos,
        userChannel: req.body.userChannel
    })

    try {
        const newNetwork = await network.save()
        res.status(201).json(newNetwork)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})

//Atualizando informação do banco de determinado id
router.patch('/:id', getNetworkID, async (req, res)=>{
    if(req.body.userName != null){
        res.network.userName = req.body.userName
    }
    if(req.body.userDesc != null){
        res.network.userDesc = req.body.userDesc
    }
    if(req.body.userOrgs != null){
        res.network.userOrgs = req.body.userOrgs
    }
    if(req.body.userNos != null){
        res.network.userNos = req.body.userNos
    }
    if(req.body.userChannel != null){
        res.network.userChannel = req.body.userChannel
    }
    try {
        const updateNetwork = await res.network.save()
        res.json(updateNetwork)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Deletando Dados do mongo
router.delete('/:id', getNetworkID, async (req, res)=>{
    try {
        await res.network.remove()
        res.json({message: 'Network was delete'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getNetworkID(req, res, next){
    try {
        network = await Network.findById(req.params.id)
        if(network == null){
            return res.status(404).json({message: 'Network not found!'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.network = network
    next()
}

module.exports = router