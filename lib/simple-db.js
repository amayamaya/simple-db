const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  get(id) {
    this.filePath = path.join(this.dirPath, `${id}.json`);
    try {
      return fs.readFile(this.filePath)
        .then(data => JSON.parse(data));
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new Error(`'bad file: ${this.filePath}`);
      }
      throw err;  
    }
  }
  //cypto built into node
  save(object) {
    object.id = crypto.randomBytes(4).toString('hex');
    const data = JSON.stringify(object);
    return fs.writeFile(`${this.dirPath}/${object.id}.json`, data)
      .then(() => object);
  }
}

module.exports = SimpleDb;
