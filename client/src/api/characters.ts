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


export async function getCharacterImage(name: string) {
    const imageUrl = `https://starwars-images-api.s3.eu-north-1.amazonaws.com/${encodeURIComponent(name).replace(/%20/g, "+")}.jpg`;
    //** Note, network errors such as 404 and 403 cannot be supressed by ctach blocks  */ 
    return fetch(imageUrl).then((response) => {
        if (!response.ok) throw new Error('Image not found');
        return imageUrl;
    })

}
