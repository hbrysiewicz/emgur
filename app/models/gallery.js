import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  posted: DS.attr('date'),
  updated: DS.attr('date'),
  comments: DS.hasMany('comment'),
  image: DS.belongsTo('image')
});
