type AuthContextType = {
    isAuthenticated: boolean;
    login: (username: string, password: string) => string;
    logout: () => void;
    token: string | null;
    username: string | null;
}

type Character = {
    name: string;
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string;
    films: string[];
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    skin_color: string;
    species: string[];
    starships: string[];
    vehicles: string[];
    url: string;
};

type CharacterResponse = {
    count: number;
    next: string;
    previous: string;
    results: Character[];
};



