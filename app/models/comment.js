import DS from 'ember-data';

export default DS.Model.extend({
  posted: DS.attr('date'),
  content: DS.attr('string')
});
