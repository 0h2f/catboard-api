const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const config = require('../config');

const account = config.containerAccount;
const accountKey = config.containerAccountKey;
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
);

//TODO: a sane error handler
//NOTE: print error to console, refuses to elaborate, continues as if nothing happened :/

exports.uploadBlockBlob = async (containerName, { blobName, blobBuffer }) => {
    try {
        let containerClient = blobServiceClient.getContainerClient(containerName);
        let blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(blobBuffer, blobBuffer.length);

        return blobName;
    } catch (err) {
        next(err);
        /*
        console.error(`upload block blob failed: \n${e}`);
        return 'default-image.png';
        */
    }
}
