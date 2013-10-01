// Lists -- {name: String}
Lists = new Meteor.Collection("lists");

Lists.allow({ // allow everyone for now
    insert: ownsDocument,
    remove: ownsDocument,
    update: ownsDocument
});


// Todos -- {text: String,
//           done: Boolean,
//           tags: [String, ...],
//           list_id: String,
//           timestamp: Number}
Todos = new Meteor.Collection("todos");

Todos.allow({ // allow everyone for now
    insert: ownsDocument,
    remove: ownsDocument,
    update: ownsDocument
});
