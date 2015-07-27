import Ember from 'ember';
export default Ember.Route.extend({
    setupController: function(controller, model) {
        /*if ('title' in Ember)
            Ember.set('title', 'Posts');
        else
            Ember.title = 'Posts';*/

        controller.set('model', model);
    },
    model: function() {
        return this.store.findAll('post');
    }
});