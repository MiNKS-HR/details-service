import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import request from 'supertest';
import mongoose from 'mongoose';
const Mockgoose = require('mockgoose').Mockgoose;
import Details from '../client/components/details.jsx';
import app from '../server/app';
import db from '../db/app.js';

configure({ adapter: new Adapter() });
let mockgoose = new Mockgoose(mongoose);

const testDetails = {
  "id":1,
  "host":{
    "name":"Matt Sweeney",
    "about":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.  Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.  Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.  Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    "picture_url":"http://dummyimage.com/64x64.jpg/ff4444/ffffff"
  },
  "experience":{
    "category":"collaboration",
    "title":"Aliquam erat volutpat."
  },
  "city":"Shezë",
  "duration":5.4,
  "language":"Macedonian",
  "what_well_do":"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
  "who_can_come":"Donec ut mauris eget massa tempor convallis.",
  "what_ill_provide":"Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  "notes":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
  "view_count":10405,
  "spots_left":3,
  "location":{
    "lat":41.021678,
    "lng":19.822316
  }
}

describe('Front end tests', () => {
  test('should render Details without throwing an error', () => {
    expect(shallow(<Details details={testDetails}/>).exists());
  });

  it('should render Map without throwing an error', () => {
    const wrapper = mount(<Details details={testDetails} />);
    expect(wrapper.find('#map-container')).toHaveLength(1);
  });

  it('should render Para without throwing an error', () => {
    const wrapper = mount(<Details details={testDetails} />);
    expect(wrapper.find('.para')).toHaveLength(4);
    expect(wrapper.find('.cond-para')).toHaveLength(1);
  });
  
});

describe('Server side tests', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

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
    })
  });

  it('should find a host given a name and return array', () => {
    db.insertOne(testDetails, () => {
      db.findHost('Matt Sweeney', (err, host) => {
        if (err) throw err;
        expect(host.length).toEqual(1);
        expect(Array.isArray(host)).toEqual(true);
      })
    });
  });

  it('should increment the view count when called', () => {
    db.insertOne(testDetails, (data) => {
      let vc = data.view_count;
      db.updateViews(data.id, (err) => {
        if (err) throw err;
        db.findAll((err, updatedData) => {
          expect(updatedData[0].view_count).toEqual(vc+1);
        });
      })
    });
  });
});
