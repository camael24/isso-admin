import DS from 'ember-data';
export default DS.Model.extend({
    text: DS.attr('string'),
    ip: DS.attr('string'),
    author: DS.attr('string'),
    authorEmail: DS.attr('string'),
    authorWebsite: DS.attr('string'),
    likes: DS.attr('string'),
    dislikes: DS.attr('string'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),
    post: DS.belongsTo('post', {async: false}),

    nId: function() {
        return +this.get('id');
    }.property('id')
});
