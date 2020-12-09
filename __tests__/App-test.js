/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />)

});

// test('should return sum of two values', () => {
//   expect(App.sum(1, 3)).toBe(4)
// })
