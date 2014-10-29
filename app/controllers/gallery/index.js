import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false,
  newComment: null,

  newCommentLength: function() {
    return this.get('newComment.length') || 0;
  }.property('newComment'),

  actions: {
    onEdit: function() {
      this.set('isEditing', true);
    },

    offEdit: function() {
      if (this.get('newCommentLength') === 0)
        this.set('isEditing', false);
    }
  }
});
