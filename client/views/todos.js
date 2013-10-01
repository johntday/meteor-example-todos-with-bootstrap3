/////////////////////////////////// HELPERS //////////////////////////////////////////
Template.todos.helpers({
    loading: function () {
        return todosHandle && !todosHandle.ready();
    },

    any_list_selected: function () {
        return !Session.equals('list_id', null);
    },

    todos: function () {
        // Determine which todos to display in main pane,
        // selected based on list_id and tag_filter.

        var list_id = Session.get('list_id');
        if (!list_id)
            return {};

        var sel = {list_id: list_id};
        var tag_filter = Session.get('tag_filter');
        if (tag_filter)
            sel.tags = tag_filter;

        return Todos.find(sel, {sort: {timestamp: 1}});
    }
});

//Template.todos.loading = function () {
//  return todosHandle && !todosHandle.ready();
//};
//
//Template.todos.any_list_selected = function () {
//  return !Session.equals('list_id', null);
//};
//
//Template.todos.todos = function () {
//    // Determine which todos to display in main pane,
//    // selected based on list_id and tag_filter.
//
//    var list_id = Session.get('list_id');
//    if (!list_id)
//        return {};
//
//    var sel = {list_id: list_id};
//    var tag_filter = Session.get('tag_filter');
//    if (tag_filter)
//        sel.tags = tag_filter;
//
//    return Todos.find(sel, {sort: {timestamp: 1}});
//};

//////////////////////////////////////// EVENTS ////////////////////////////////////////
Template.todos.events(commonClient.okCancelEvents(
  '#new-todo',
  {
    ok: function (text, evt) {
      var tag = Session.get('tag_filter');
      Todos.insert({
        text: text,
        list_id: Session.get('list_id'),
        done: false,
        timestamp: (new Date()).getTime(),
        tags: tag ? [tag] : []
      });
      evt.target.value = '';
    }
  }));
