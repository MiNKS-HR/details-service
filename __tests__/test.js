import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import request from 'supertest';
import Details from '../client/details';
import app from '../server/app';

configure({ adapter: new Adapter() });

const testDetails = {
  "id":1,
  "host":{
    "name":"Matt Sweeney",
    "about":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.","picture_url":"http://dummyimage.com/64x64.jpg/ff4444/ffffff"
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
  test('should render without throwing an error', () => {
    expect(shallow(<Details details={testDetails}/>).exists());
  });

  it('check that optional sections render given state', () => {
    const wrapper = mount(<Details details={testDetails} />);
    expect(wrapper.find('.count')).toHaveLength(2);
  });
});

describe('Back end tests', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('It should respond with data from db', (done) => {
    request(app).get('/experience/details').then((response) => {
      const hasId = response.body.hasOwnProperty('id');
      expect(hasId).toBe(true);
      done();
    });
  });
});
