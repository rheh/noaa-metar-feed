'use strict';

var JSFtp = require("jsftp");
var FS = require('fs');
var Q = require('q');

var FTPHelper = module.exports = function (host) {

    this.ftp = new JSFtp({
        host: host
    });
};

FTPHelper.prototype.get = function (remote, local, callback) {

    console.log("Attempting FTP get on " + remote + " file");

    var getIt = function (ftp) {

        var deferred = Q.defer();

        ftp.get(remote, local, function (hadErr) {

            if (hadErr) {
                deferred.reject(new Error('There was an error retrieving the file.'));
            } else {
                console.log("FTP get successfull!");
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    getIt(this.ftp)
    .done(function () {
        callback(local);
    });
};
