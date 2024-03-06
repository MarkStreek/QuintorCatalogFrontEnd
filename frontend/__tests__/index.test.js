import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/pages/index';

describe('Home', () => {
  test('renders Home component', () => {
    render(<Home />);
    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});