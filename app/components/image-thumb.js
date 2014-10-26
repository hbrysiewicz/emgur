import Ember from 'ember';

export default Ember.Component.extend({
  isHovering: false,

  commentsCount: function() {
    return this.get('content.comments.length');
  }.property('content.comments'),

  mouseEnter: function() {
    this.set('isHovering', true);
  },

  mouseLeave: function() {
    this.set('isHovering', false);
  }
});
