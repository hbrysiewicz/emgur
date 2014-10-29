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
  },
  '5': {
    id: 5,
    url: 'http://i.imgur.com/5aXac9q.gif?1'
  },
  '6': {
    id: 6,
    url: 'http://i.imgur.com/Mnsld14.jpg'
  },
  '7': {
    id: 7,
    url: 'http://i.imgur.com/e8q8MJY.jpg'
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
  },
  '5': {
    id: 5,
    title: 'BMO Battery Switch',
    posted: 1414359113315,
    updated: 1414359113315,
    comments: [2,3],
    image: 5
  },
  '6': {
    id: 6,
    title: "That moment when you just give up and don't care anymore",
    posted: 1414192068670,
    updated: 1414192068670,
    comments: [4],
    image: 6
  },
  '7': {
    id: 7,
    title: 'Started fostering kittens yesterday, this guy tuckered himself out playing with his siblings',
    posted: 1401492647008,
    updated: 1401492647008,
    comments: [],
    image: 7
  }
};

var COMMENTS = {
  '1': {
    id: 1,
    posted: 1414192068670,
    content: "I have a friend who started an animal rescue. Thought about doing a post for her and her organization. Anyone interested?"
  },
  '2': {
    id: 2,
    posted: 1414359113315,
    content: 'I down voted because repost, then upvoted because you got me.'
  },
  '3': {
    id: 3,
    posted: 1414192068670,
    content: "EVEN REFRESHING DOESN'T HELP"
  },
  '4': {
    id: 4,
    posted: 1414192068670,
    content: 'FLY YOU FOWL, FLY!'
  }
};

// TODO move server into own file
// TODO cleanup endpoint code
var server = new Pretender(function() {
  var maxImageId = 7;
  var maxGalleryId = 7;
  var maxCommentId = 4;

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
    var gallery = GALLERIES[request.params.id];
    var images = Object.keys(IMAGES).map(function(k) {
      return IMAGES[k];
    });
    var comments = Object.keys(COMMENTS).map(function(k) {
      return COMMENTS[k];
    });

    var jsonStr = JSON.stringify({
      gallery: gallery,
      images: images,
      comments: comments
    });

    return [200, {"Content-Type": "application/json"}, jsonStr];
  });

  // Create a gallery item
  this.post('/galleries', function(request) {
    var gallery = JSON.parse(request.requestBody).gallery;
    gallery.id = ++maxGalleryId;
    gallery.posted = Date.now();
    GALLERIES[gallery.id] = gallery;
    var json = JSON.stringify({ gallery: gallery });
    return [200, {"Content-Type": "application/json"}, json];
  });

  // Update a gallery item
  this.put('/galleries/:id', function(request) {
    var gallery = JSON.parse(request.requestBody).gallery;
    gallery.id = request.params.id;
    gallery.updated = Date.now();
    GALLERIES[gallery.id] = gallery;
    var json = JSON.stringify({ gallery: gallery });
    return [200, {"Content-Type": "application/json"}, json];
  });

  // Find specific image item
  this.get('/images/:id', function(request) {
    var image = JSON.stringify({ "image": IMAGES[request.params.id] });
    return [200, {"Content-Type": "application/json"}, image];
  });

  // Create an image item
  this.post('/images', function(request) {
    var image = JSON.parse(request.requestBody);
    image.id = ++maxImageId;
    IMAGES[image.id] = image;
    var json = JSON.stringify({ image: image });
    return [200, {"Content-Type": "application/json"}, json];
  });

  // Find specific comment item
  this.get('/comments/:id', function(request) {
    var comment = JSON.stringify({ "comment": COMMENTS[request.params.id] });
    return [200, {"Content-Type": "application/json"}, comment];
  });

  // Create a comment item
  this.post('/comments', function(request) {
    var comment = JSON.parse(request.requestBody).comment;
    comment.id = ++maxCommentId;
    comment.posted = Date.now();
    COMMENTS[comment.id] = comment;
    var json = JSON.stringify({ comment: comment });
    return [200, {"Content-Type": "application/json"}, json];
  });
});

loadInitializers(App, config.modulePrefix);

export default App;
