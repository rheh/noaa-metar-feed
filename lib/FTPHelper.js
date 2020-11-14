/* eslint-disable require-jsdoc */
const ftp = require('basic-ftp');
const client = new ftp.Client();

exports.connect = async function connect(host) {
  await client.access({
    host: host,
    secure: false,
  });
};

exports.get = async function get(remoteDirectory, remoteFile, local) {
  console.log(`Attempting FTP get ${remoteDirectory} file  ${remoteFile}`);

  await client.cd(remoteDirectory);
  await client.downloadTo(local, remoteFile);

  console.log(`Successfully got ${remoteDirectory} file ${remoteFile}`);

  return local;
};

exports.close = function connect(host) {
  client.close();
};
