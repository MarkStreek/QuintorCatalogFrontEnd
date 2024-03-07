import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/pages';

describe('Home', () => {
  test('renders Home component', () => {
    render(<Home />);
    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});