const mongoose = require("mongoose");
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;
// Using the Schema constructor, create a new UserSchema object (collections aka table with the columns)
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: false,
    },
    summary: {
        type: String,
        default: "Summary unavailable."
    },
    img: {
        type: String,
        default: "/assets/img/img_not_available.png"
    },
    issaved: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Save Article"
    },
    created: {
        type: Date,
        default: Date.now
    },
  // This allows the Article object to create an association to the Note object
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// This creates our model from the above schema, using mongoose's model method
// export const Article = mongoose.model("Article", ArticleSchema);

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;