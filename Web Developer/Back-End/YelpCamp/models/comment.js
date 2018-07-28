var mongoose     = require ("mongoose");

// SCHEMA SETUP for COMMENTS
var commentsSchema = new mongoose.Schema(
{
    text:      String,
    author:    String
});

module.exports = mongoose.model("Comment", commentsSchema);
