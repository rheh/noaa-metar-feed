'use strict';

const JSFtp = require('jsftp');
const FS = require('fs');
const Q = require('q');

const FTPHelper = module.exports = function(host) {
  this.ftp = new JSFtp({
    host: host,
  });
};

FTPHelper.prototype.get = function(remote, local, callback) {
  console.log('Attempting FTP get on ' + remote + ' file');

  const getIt = function(ftp) {
    const deferred = Q.defer();

    ftp.get(remote, local, function(hadErr) {
      if (hadErr) {
        deferred.reject(new Error('There was an error retrieving the file.'));
      } else {
        console.log('FTP get successfull!');
        deferred.resolve();
      }
    });

    return deferred.promise;
  };

  getIt(this.ftp)
      .done(function() {
        callback(local);
      });
};
