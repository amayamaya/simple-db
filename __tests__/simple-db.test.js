const fs = require('fs/promises');
const path = require('path');
const SimpleDb = require('../lib/simple-db');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('saves object as JSON file', async () => {
    const obj1 = { name: 'test', age: 1 };
    const db = new SimpleDb(TEST_DIR);
    const savedObj = await db.save(obj1);
    await db.get(savedObj.id);
    expect(savedObj).toEqual({ ...obj1, id: expect.any(String) });
  });

});
