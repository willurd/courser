var fs = require('fs');

var COURSER_HOST = '127.0.0.1 site.dev-coursera.org';
var COURSERA_HOST = '192.168.56.101 site.dev-coursera.org';

module.exports = {
  writeCourserHost: function() {
    var hostData = fs.readFileSync('/etc/hosts', 'utf-8');
    var newHostData = hostData.replace(new RegExp(COURSERA_HOST), COURSER_HOST);
    fs.writeFileSync('/etc/hosts', newHostData);
  },

  writeBackHost: function() {
    var hostData = fs.readFileSync('/etc/hosts', 'utf-8');
    var oldHostData = hostData.replace(new RegExp(COURSER_HOST), COURSERA_HOST);
    fs.writeFileSync('/etc/hosts', oldHostData);
  }
};
