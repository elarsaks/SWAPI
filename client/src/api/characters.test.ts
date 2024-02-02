import fetchMock from 'jest-fetch-mock';
import { getCharacters } from './characters';

// Enable fetch mocks globally for all tests in this file
fetchMock.enableMocks();

// Before each test, reset the mocks to ensure clean state and no interference between tests
beforeEach(() => {
    fetchMock.resetMocks();
});

// Describe block defines a test suite for the getCharacters function
describe('getCharacters', () => {
    // Test case 1: Successful API call
    it('fetches characters successfully from the SWAPI', async () => {
        // Define mock response to simulate fetching data successfully from the API
        const mockResponse = {
            results: [{ name: 'Luke Skywalker' }],
        };
        // Mock the fetch call once with the JSON string of the mockResponse
        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        // Call the function with test data and wait for its promise to resolve
        const response = await getCharacters('skywalker', 1);

        // Assert that the function returns the expected data structure
        expect(response.results).toEqual(mockResponse.results);
        // Verify that the fetch was called with the correct URL and query parameters
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?search=skywalker&page=1');
    });

    // Test case 2: Handling API errors
    it('throws an error when the response is not ok', async () => {
        // Mock the fetch call to reject once simulating a network or HTTP error
        fetchMock.mockReject(new Error('HTTP error! status: 404'));

        // Assert that calling getCharacters with parameters that lead to an error
        // will indeed throw the expected error. The test expects a promise rejection.
        await expect(getCharacters('unknown', 1)).rejects.toThrow('HTTP error! status: 404');
    });
});
