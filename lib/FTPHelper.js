/* eslint-disable require-jsdoc */

const ftp = require('basic-ftp');

async function getIt(client, remoteDirectory, remoteFile, local) {
  console.log(`Attempting FTP get ${remoteDirectory} file  ${remoteFile}`);

  await client.cd(remoteDirectory);
  await client.downloadTo(local, remoteFile);

  console.log('FTP get successful!');

  return local;
}

const FTPHelper = function() {
  this.client = new ftp.Client();
  // this.client.ftp.verbose = true;
};

FTPHelper.prototype.connect = async function(host) {
  await this.client.access({
    host: host,
    secure: false,
  });

  return this;
};

FTPHelper.prototype.get = function(remoteDirectory, remoteFile, local) {
  return getIt(this.client, remoteDirectory, remoteFile, local);
};

module.exports = FTPHelper;
