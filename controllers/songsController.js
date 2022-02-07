const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong, createSong, deleteSong, updateSong } = require("../queries/songs.js");
const { validateSongs } = require("../validations/checkSongs.js");
const reviewsController = require("./reviewsController.js");
// const songsRoutesHelper = require("../helpers/songsOrder.js")

// MIDDLEWARE Routes
songs.use("/:songID/reviews", reviewsController);

// INDEX
songs.get("/", async (req, res) => {
    // const { order, is_favorite } = req.query; 
    // if(order){
    //     return songsRoutesHelper.sortedResponse(logs,order,res);
    // }

    // if(is_favorite){
    //     return songsRoutesHelper.filteredMistakesResponse(logs,is_favorite,res);
    // }
    try{
        const allSongs = await getAllSongs();
        if(allSongs[0]){
            res.status(200).json(allSongs);
        }else{
            res.status(500).json({ error: "server error" });
        }
    }catch(err){
        console.log(err);
    }
});

// SHOW
songs.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const song = await getSong(id);
        if(song.id){
            res.status(200).json(song);
        }else{
            res.status(404).json({error: "Not Found"});
        }
    }catch(err){
        console.log(err);
    }
});

// CREATE
songs.post("/", async (req, res) => {
    const { body } = req;
    try{
        const createdSong = await createSong(body);
        if(createdSong.id){
            res.status(200).json(createdSong);
        }else{
            res.status(500).json({error: "Song creation error"});
        }
    }catch(err){
        console.log(err);
    }
});

// DELETE
songs.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    if(deleteSong.id){
        res.status(200).json(deletedSong);
    }else{
        res.status(404).json({error: "Song not found"});
    }
});

// UPDATE
songs.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const updatedSong = await updateSong(id, body);
    if(updatedSong.id){
        res.status(200).json(updatedSong);
    }else{
        res.status(404).json({error: "Song not found"});
    }
});

module.exports = songs;