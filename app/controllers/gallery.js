import Ember from 'ember';

export default Ember.ObjectController.extend({
  maxChars: 140,
  isEditing: false,
  newComment: null,

  newCommentCharacters: function() {
    return this.maxChars - this.get('newComment.length');
  }.property('newComment'),

  actions: {
    onEdit: function() {
      this.set('isEditing', true);
    },

    offEdit: function() {
      if (this.get('newCommentCharacters') === this.maxChars)
        this.set('isEditing', false);
    }
  }
});
