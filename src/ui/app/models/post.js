import DS from 'ember-data';
export default DS.Model.extend({
    uri: DS.attr('string'),
    title: DS.attr('string'),
    comments: DS.hasMany('comments', {async: true})
});
