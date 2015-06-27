var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlanningSchema = new Schema({
    username: {
        type: String,
        required: true,
        default: 'website'
    },
    date: {
        type: Date,
        required: true
    },
    recipe: {
        title: {
            type: String,
            required: true,
            trim: true
        },
        origin: {
            url: String,
            language: String,
            image: String,
            copyright: String
        },
        story: String,
        labels: [String],
        dish_labels: [String],
        short_name: String,
        image: String,
        persons: Number,
        original_recipes: [Object],
        time: Number,
        level: Number,
        language: String,
        ingredients: [{
            for_what: String,
            list: [{
                name: String,
                quantity: Number,
                um: String,
                category: String,
                comment: String
            }]
        }],
        instructions: [{
            order: Number,
            for_what: String,
            text: String
        }],
        comments: [{
            username: String,
            text: String,
            rating: String
        }]

    }

},{
    collection: 'planning'
});


// var RecipesSchema = new Schema({
//     name: String,
//     origin: {
//         url: String,
//         language: String,
//         image: String,
//         copyright: String
//     },
//     story: String,
//     labels: [String],
//     dish_labels: [String],
//     short_name: String,
//     image: String,
//     persons: Number,
//     original_recipes: [Object],
//     time: Number,
//     level: Number,
//     language: String,
//     ingredients: [{
//         for_what: String,
//         list: [{
//             name: String,
//             quantity: Number,
//             um: String,
//             category: String,
//             comment: String
//         }]
//     }],
//     instructions: [{
//         order: Number,
//         for_what: String,
//         text: String
//     }],
//     comments: [{
//         username: String,
//         text: String,
//         rating: String
//     }]
// }, {
//     collection: "recipes"
// });

// var Recipes = mongoose.model("Recipes", RecipesSchema);
mongoose.model('Planning', PlanningSchema);

// module.exports = {
//     FixedPlanning: FixedPlanning,
//     Recipes: Recipes
// }
