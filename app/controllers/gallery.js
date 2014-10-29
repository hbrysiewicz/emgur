import Ember from 'ember';

export default Ember.ObjectController.extend({
  maxChars: 140,
  isEditing: false,
  newComment: null,

  postedFormated: function() {
    return moment(this.get('posted')).fromNow();
  }.property('posted'),

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
    },

    submitComment: function() {
      var _this = this;

      var comment = this.store.createRecord('comment', {
        content: this.get('newComment')
      });

      comment.save().then(function(comment) {
        var gallery = _this.get('content');
        gallery.get('comments').pushObject(comment);

        gallery.save().then(function(gallery) {
          _this.set('newComment', null);
        }, function(err) {
          // TODO: handle error
        });
      });
    }
  }
});
