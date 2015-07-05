
Package.describe({
  name: 'garyascuy:osxdock',
  version: '0.0.1',
  summary: 'OSX Dock is a javascript library to have OSX Dock menu in the browser',
  git: 'https://github.com/Gary-Ascuy/osxdock.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('underscore');
  api.use('jquery');

  api.addFiles('main.js');
  api.addFiles('dock/eventManager.js');
  api.addFiles('dock/objectDock.js');

  api.export('OSX', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('garyascuy:osxdock');
  api.addFiles('tests.js');
});
