export function getCharacters(searchWord: string, page: number): Promise<CharacterResponse> {
    return fetch(`https://swapi.dev/api/people/?search=${searchWord}&page=${page}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => data as CharacterResponse);
}
