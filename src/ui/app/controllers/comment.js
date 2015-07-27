import Ember from 'ember';
export default Ember.Controller.extend({
    sortProperties: ["nId:desc"],
    sortedModel: Ember.computed.sort("model", "sortProperties"),
    sortDirection: 'desc',

    actions: {
        sortBy: function(property) {
            var direction = 'desc' === this.get('sortDirection') ? 'asc' : 'desc';

            this.set('sortProperties', [property + ':' + direction]);
            this.set('sortDirection', direction);
        }
    }
});