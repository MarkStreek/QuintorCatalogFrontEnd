// // __tests__/DevicesTableComponent.test.js
// import React from 'react';
// import { render, waitFor, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import {DummyDataTable} from '../components/DevicesTableComponent';
//
// describe('DevicesTableComponent Component', () => {
//   // Mock global fetch function
//   beforeEach(() => {
//     global.fetch = jest.fn();
//     fetch.mockClear();
//   });
//
//   it('displays data after successful fetch', async () => {
//     // Mock fetch to return some dummy data
//     const mockData = [
//       { id: 1, name: 'Name1', value: 'Value1' },
//       { id: 2, name: 'Name2', value: 'Value2' },
//     ];
//     fetch.mockResolvedValue({
//       ok: true,
//       json: () => Promise.resolve(mockData),
//     });
//
//     render(<DummyDataTable />);
//
//     // Verify that the table displays the fetched data
//     for (const item of mockData) {
//       await waitFor(() => {
//         expect(screen.getByText(item.name)).toBeInTheDocument();
//         expect(screen.getByText(item.value)).toBeInTheDocument();
//       });
//     }
//   });
//
//
//   // Test case for pagination interaction
//   it('changes data displayed when pagination is used', async () => {
//     // Mock fetch to return a larger set of data for pagination
//     const mockData = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Name${i + 1}`, value: `Value${i + 1}` }));
//     fetch.mockResolvedValue({
//       ok: true,
//       json: () => Promise.resolve(mockData),
//     });
//
//     render(<DummyDataTable />);
//
//     // Initially, we expect to see the first page of data
//     await waitFor(() => {
//       expect(screen.getByText('Name1')).toBeInTheDocument();
//       expect(screen.getByText('Name2')).toBeInTheDocument(); // Assuming 2 rows per page!
//     });
//
//     // Find and click the next page button to load the next set of data
//     const nextPageButton = screen.getByRole('button', { name: /next page/i });
//     fireEvent.click(nextPageButton);
//
//     // Now, we expect to see the second page of data
//     await waitFor(() => {
//       expect(screen.getByText('Name3')).toBeInTheDocument();
//       expect(screen.getByText('Name4')).toBeInTheDocument(); // Assuming 2 rows per page!
//     });
//   });
//
//
//   // Test case for empty/failed data fetch, should show empty content
//   it('displays empty content message when no data is fetched', async () => {
//     // Simulate fetching empty data
//     fetch.mockResolvedValue({
//       ok: true,
//       json: () => Promise.resolve([]),
//     });
//
//     render(<DummyDataTable />);
//     // Wait for the component to update based on the fetch response
//     await waitFor(() => {
//       // Check if the emptyContent message "No rows to display" is rendered
//       expect(screen.getByText('No rows to display')).toBeInTheDocument();
//     });
//   });
//
//   // Test case for checking the loading state
//   it('displays loading skeletons while fetching data', async () => {
//     // Delay the fetch response to ensure the loading state is visible
//     const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
//     fetch.mockImplementationOnce(() => delay(100).then(() => Promise.resolve({
//       ok: true,
//       json: () => Promise.resolve([]), // Resolve with empty data
//     })));
//
//     render(<DummyDataTable />);
//
//     // Check for the presence of the Skeleton components
//     const skeletons = screen.getAllByTestId('skeleton');
//     expect(skeletons.length).toBeGreaterThanOrEqual(1); // Correct assertion for array length
//
//     // Optionally, wait for the fetch to complete and loading to disappear
//     await waitFor(() => expect(screen.queryAllByTestId('skeleton')).toHaveLength(0));
//   });
//
//
// });
//
//
//
//
