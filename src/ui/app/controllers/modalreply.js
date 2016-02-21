import Ember from 'ember';
export default Ember.Controller.extend({
    actions: {
        close: function(obj, y) {
      

            return this.send('closeModal');
        }
    }
});
