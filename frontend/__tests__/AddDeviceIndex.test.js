import { render, screen } from '@testing-library/react';
import AddDevice from '../src/pages/addDevice/index.js';
import React from 'react';

test('renders AddDevice with correct elements', () => {
    render(<AddDevice />);
    const headingElement = screen.getByText(/Nieuw Apparaat toevoegen/i);
    expect(headingElement).toBeInTheDocument();
});
