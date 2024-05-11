import { render, fireEvent, screen } from '@testing-library/react';
import AddNewSpecification from '../src/pages/addDevice/AddNewSpecification.js';
import React from 'react';

test('renders without crashing', () => {
    const setAlreadyUsedSpecs = jest.fn();
    render(<AddNewSpecification alreadyUsedSpecs={[]} setAlreadyUsedSpecs={setAlreadyUsedSpecs} />);
});

test('renders inputs and button', () => {
    const setAlreadyUsedSpecs = jest.fn();
    render(<AddNewSpecification alreadyUsedSpecs={[]} setAlreadyUsedSpecs={setAlreadyUsedSpecs} />);

    const nameInput = screen.getByLabelText(/Specificatie naam/i);
    expect(nameInput).toBeInTheDocument();

    const typeInput = screen.getByLabelText(/Specificatie type/i);
    expect(typeInput).toBeInTheDocument();

    const button = screen.getByText(/Specificatie toevoegen/i);
    expect(button).toBeInTheDocument();
});

test('updates state on input change', () => {
    const setAlreadyUsedSpecs = jest.fn();
    render(<AddNewSpecification alreadyUsedSpecs={[]} setAlreadyUsedSpecs={setAlreadyUsedSpecs} />);

    const nameInput = screen.getByLabelText(/Specificatie naam/i);
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    expect(nameInput.value).toBe('Test Name');

    const typeInput = screen.getByLabelText(/Specificatie type/i);
    fireEvent.change(typeInput, { target: { value: 'Test Type' } });
    expect(typeInput.value).toBe('Test Type');
});

test('updates alreadyUsedSpecs on button click', () => {
    const setAlreadyUsedSpecs = jest.fn();
    render(<AddNewSpecification alreadyUsedSpecs={[]} setAlreadyUsedSpecs={setAlreadyUsedSpecs} />);

    const nameInput = screen.getByLabelText(/Specificatie naam/i);
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });

    const typeInput = screen.getByLabelText(/Specificatie type/i);
    fireEvent.change(typeInput, { target: { value: 'Test Type' } });

    const button = screen.getByText(/Specificatie toevoegen/i);
    fireEvent.click(button);

    expect(setAlreadyUsedSpecs).toHaveBeenCalledWith([{ specName: 'Test Name', dataType: 'Test Type' }]);
});