import Ember from 'ember';

export default Ember.Component.extend({
  commentsCount: function() {
    return this.get('content.comments.length');
  }.property('content.comments')
});
