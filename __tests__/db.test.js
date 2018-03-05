import mongoose from 'mongoose';
const { Mockgoose } = require('mockgoose');
import db from '../db/app.js';
import testDetails from '../db/testDetails.js';

const mockgoose = new Mockgoose(mongoose);

describe('Database method tests', () => {
  beforeEach((done) => {
    jest.setTimeout(100000);
    mongoose.connection.close();
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://127.0.0.1/experiences', (err) => {
        done(err);
      });
    });
  });

  it('should insert a detail to database', () => {
    db.insertOne(testDetails, () => {
      db.findAll((err, data) => {
        if (err) throw err;
        expect(data.length).toEqual(1);
      });
    });
  });

  it('should find a host given a name and return array', () => {
    db.insertOne(testDetails, () => {
      db.findHost('Matt Sweeney', (err, host) => {
        if (err) throw err;
        expect(host.length).toEqual(1);
        expect(Array.isArray(host)).toEqual(true);
      });
    });
  });

  it('should increment the view count when called', () => {
    db.insertOne(testDetails, (data) => {
      const vc = data.view_count;
      db.updateViews(data.id, (err) => {
        if (err) throw err;
        db.findAll((err, updatedData) => {
          expect(updatedData[0].view_count).toEqual(vc + 1);
        });
      });
    });
  });
});
