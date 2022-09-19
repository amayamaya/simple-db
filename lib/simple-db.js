const fs = require('fs/promises');
const path = require('path');

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
}

module.exports = SimpleDb;
