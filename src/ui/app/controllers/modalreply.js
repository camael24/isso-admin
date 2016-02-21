import Ember from 'ember';
export default Ember.Controller.extend({
    actions: {
        close: function(obj, y) {
            if (y) {
                obj.destroyRecord();
            }

            return this.send('closeModal');
        }
    }
});
