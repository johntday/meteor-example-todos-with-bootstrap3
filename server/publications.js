// Publish complete set of lists to all clients.
// sort by name
// no limit
Meteor.publish('lists', function () {
  return Lists.find({}, {sort: {name: 1}});
});


// Publish all items for requested list_id.
// no sort
// no limit
Meteor.publish('todos', function (list_id) {
  check(list_id, String);
  return Todos.find({list_id: list_id});
});
