import Ember from 'ember';
import DS from 'ember-data';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

App.Store = DS.Store.extend({
  revision: 13
});

// Define FIXTURE data
var IMAGES = {
  '1': {
    id: 1,
    url: 'http://i.imgur.com/8Ks8TVz.jpg'
  },
  '2': {
    id: 2,
    url: 'http://i.imgur.com/0HPuChc.jpg'
  },
  '3': {
    id: 3,
    url: 'http://i.imgur.com/sVRsGmH.jpg'
  },
  '4': {
    id: 4,
    url: 'http://i.imgur.com/X2xGlUQ.gif'
  }
};

var GALLERIES = {
  '1': {
    id: 1,
    title: 'My dog got a new sweater',
    posted: 1414191984402,
    updated: 1414191994961,
    comments: [],
    image: 1
  },
  '2': {
    id: 2,
    title: 'Foster puppy came to play in the leaves!',
    posted: 1401492647008,
    updated: 1401492647008,
    comments: [1],
    image: 2
  },
  '3': {
    id: 3,
    title: 'Introducing Minor Mistake Mr. Mittens',
    posted: 1414192068670,
    updated: 1414192068670,
    comments: [],
    image: 3
  },
  '4': {
    id: 4,
    title: 'MRW I get downvoted to oblivion',
    posted: 1415174400000,
    updated: 1415174400000,
    comments: [],
    image: 4
  }
};

var COMMENTS = {
  '1': {
    id: 1,
    posted: 1414192068670,
    content: "I have a friend who started an animal rescue. Thought about doing a post for her and her organization. Anyone interested?"
  }
};

var server = new Pretender(function() {
  this.maxImageId = 3;
  this.maxGalleryId = 3;
  this.maxCommentId = 1;

  this.getAll = function() {
    var galleries = Object.keys(GALLERIES).map(function(k) {
      return GALLERIES[k];
    });
    var images = Object.keys(IMAGES).map(function(k) {
      return IMAGES[k];
    });
    var comments = Object.keys(COMMENTS).map(function(k) {
      return COMMENTS[k];
    });
    var all =  JSON.stringify({
      "galleries": galleries,
      "images": images,
      "comments": comments
    });
    return [200, {"Content-Type": "application/json"}, all];
  };

  // Find all galleries
  this.get('/galleries', this.getAll);

  // Find all images
  this.get('/images', this.getAll);

  // Find all comments
  this.get('/comments', this.getAll);

  // Find specific gallery item
  this.get('/galleries/:id', function(request) {
    var gallery = JSON.stringify({ "gallery": GALLERIES[request.params.id] });
    return [200, {"Content-Type": "application/json"}, gallery];
  });

  // Create a gallery item
  this.post('/galleries', function(request) {
    var gallery = JSON.parse(request.requestBody);
    gallery.id = ++this.maxGalleryId;
    GALLERIES[gallery.id] = gallery;
    return [200, {"Content-Type": "application/json"}, gallery];
  });

  // Find specific image item
  this.get('/images/:id', function(request) {
    var image = JSON.stringify({ "image": IMAGES[request.params.id] });
    return [200, {"Content-Type": "application/json"}, image];
  });

  // Create a image item
  this.post('/images', function(request) {
    var image = JSON.parse(request.requestBody);
    image.id = ++this.maxImageId;
    IMAGES[image.id] = image;
    return [200, {"Content-Type": "application/json"}, image];
  });

  // Find specific comment item
  this.get('/comments/:id', function(request) {
    var comment = JSON.stringify({ "comment": COMMENTS[request.params.id] });
    return [200, {"Content-Type": "application/json"}, comment];
  });

  // Create an comment item
  this.post('/comments', function(request) {
    var comment = JSON.parse(request.requestBody);
    comment.id = ++this.maxCommentId;
    COMMENTS[comment.id] = comment;
    return [200, {"Content-Type": "application/json"}, comment];
  });
});

loadInitializers(App, config.modulePrefix);

export default App;
