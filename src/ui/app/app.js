import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

App.ModalDialogComponent = Ember.Component.extend({
    actions: {
        close: function() {
            return this.sendAction();
        }
    }
});

Ember.Handlebars.registerBoundHelper('substr', function(value, options) {

    var opts = options.hash;

    var start = opts.start || 0;
    var len = opts.max;

    var out = value.substr(start, len);

    if (value.length > len)
        out += '...';

    return new Ember.Handlebars.SafeString(out);
});

export default App;
