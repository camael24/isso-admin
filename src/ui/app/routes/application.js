export default Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('post');
    },

    actions: {
        openModal: function(modalName, model, message) {
            var ctrl = this.controllerFor(modalName);
            ctrl.set('model', model);
            ctrl.set('message', message);

            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        closeModal: function() {
            return this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }
    }
});