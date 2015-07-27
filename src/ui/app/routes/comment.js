import Ember from 'ember';
export default Ember.Route.extend({
    setupController: function(controller, model) {
        /*if ('title' in Ember)
            Ember.set('title', 'Comments');
        else
            Ember.title = 'Comments';*/

        controller.set('model', model);
    },
    model: function() {
        /*return this.store.findAll('comment').then(function(comments) {
            return comments.sortBy('nId:desc');
        });*/
        return this.store.findAll('comment');
    }
});