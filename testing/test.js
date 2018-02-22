import renderer from 'react-test-renderer';

test('should render details', () => {
  const component = renderer.create('<Details />');
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

