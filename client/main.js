// ID of currently selected list
Session.setDefault('list_id', null);

// Name of currently selected tag for filtering
Session.setDefault('tag_filter', null);

// When adding tag to a todo, ID of the todo
Session.setDefault('editing_addtag', null);

// When editing a list name, ID of the list
Session.setDefault('editing_listname', null);

// When editing todo text, ID of the todo
Session.setDefault('editing_itemname', null);

// Subscribe to 'lists' collection on startup.
// Select a list once data has arrived.
// NOTE:  no "var" - this way the score is not limited to just this file
listsHandle = Meteor.subscribe('lists', function () {
    if (!Session.get('list_id')) {
        var list = Lists.findOne({}, {sort: {name: 1}});
        if (list)
            Router.setList(list._id);
    }
});

// NOTE:  no "var" - this way the score is not limited to just this file
todosHandle = null;
// Always be subscribed to the todos for the selected list.
Deps.autorun(function () {
    var list_id = Session.get('list_id');
    if (list_id)
        todosHandle = Meteor.subscribe('todos', list_id);
    else
        todosHandle = null;
});

//function logRenders() {
//    _.each(Template, function (template, name) {
//        var oldRender = template.rendered;
//        var counter = 0;
//
//        template.rendered = function () {
//            console.log(name, "render count: ", ++counter);
//            oldRender && oldRender.apply(this, arguments);
//        };
//    });
//};
//
//logRenders();
