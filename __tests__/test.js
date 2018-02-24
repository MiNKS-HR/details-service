import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import request from 'supertest';
import Details from '../client/details.jsx';
import app from '../server/app';

configure({ adapter: new Adapter() });

describe('A suite', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Details />).exists())
  });

  describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
      request(app).get('/').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
