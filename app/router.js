import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('gallery', { path: '/gallery/:gallery_id' }, function() {
    this.route('comment', { path: '/comment/:comment_id' });
  });
});

export default Router;
