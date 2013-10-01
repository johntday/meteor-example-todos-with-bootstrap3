/////////////////////////////////// HELPERS //////////////////////////////////////////
Template.todo_item.helpers({
    tag_objs: function() {
        var todo_id = this._id;
        return _.map(this.tags || [], function (tag) {
            return {todo_id: todo_id, tag: tag};
        });
    },

    done_class: function () {
        return this.done ? 'done' : '';
    },

    done_checkbox: function () {
        return this.done ? 'checked="checked"' : '';
    },

    editing: function () {
        return Session.equals('editing_itemname', this._id);
    },

    adding_tag: function () {
        return Session.equals('editing_addtag', this._id);
    }
});

//Template.todo_item.tag_objs = function () {
//    var todo_id = this._id;
//    return _.map(this.tags || [], function (tag) {
//        return {todo_id: todo_id, tag: tag};
//    });
//};
//Template.todo_item.done_class = function () {
//    return this.done ? 'done' : '';
//};
//Template.todo_item.done_checkbox = function () {
//    return this.done ? 'checked="checked"' : '';
//};
//Template.todo_item.editing = function () {
//    return Session.equals('editing_itemname', this._id);
//};
//Template.todo_item.adding_tag = function () {
//    return Session.equals('editing_addtag', this._id);
//};

//////////////////////////////////////// EVENTS ////////////////////////////////////////
Template.todo_item.events({
    'click .check': function () {
        Todos.update(this._id, {$set: {done: !this.done}});
    },

    'click .destroy': function () {
        Todos.remove(this._id);
    },

    'click .addtag': function (evt, tmpl) {
        Session.set('editing_addtag', this._id);
        Deps.flush(); // update DOM before focus
        commonClient.activateInput(tmpl.find("#edittag-input"));
    },

    'dblclick .display .todo-text': function (evt, tmpl) {
        Session.set('editing_itemname', this._id);
        Deps.flush(); // update DOM before focus
        commonClient.activateInput(tmpl.find("#todo-input"));
    },

    'click .remove': function (evt) {
        var tag = this.tag;
        var id = this.todo_id;

        evt.target.parentNode.style.opacity = 0;
        // wait for CSS animation to finish
        Meteor.setTimeout(function () {
            Todos.update({_id: id}, {$pull: {tags: tag}});
        }, 300);
    }
});

Template.todo_item.events(commonClient.okCancelEvents(
    '#todo-input',
    {
        ok: function (value) {
            Todos.update(this._id, {$set: {text: value}});
            Session.set('editing_itemname', null);
        },
        cancel: function () {
            Session.set('editing_itemname', null);
        }
    }));

Template.todo_item.events(commonClient.okCancelEvents(
    '#edittag-input',
    {
        ok: function (value) {
            Todos.update(this._id, {$addToSet: {tags: value}});
            Session.set('editing_addtag', null);
        },
        cancel: function () {
            Session.set('editing_addtag', null);
        }
    }));
