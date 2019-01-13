const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    summary: {
        type: String,
        required:true,
        unique: true
    },
    URL: {
        type: String,
        required: true,
        unique: true
    },
    saved: {
        type: Boolean,
        default: false
    }
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
