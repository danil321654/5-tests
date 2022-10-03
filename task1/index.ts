const API = "https://rickandmortyapi.com/api";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: object;
  location: object;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

const fetchCharacters = async (characters: string[]): Promise<Character[]> => {
  const characterIds = characters.map(
    (character) => character.split("/").reverse()[0]
  );
  try {
    const charactersResponse = await fetch(
      `${API}/character/${characterIds.join(",")}`
    );

    return await charactersResponse.json();
  } catch {
    console.error("ERROR GETTING CHARACTERS");
    return [];
  }
};

const fetchAllEpisodes = async (): Promise<Episode[]> => {
  try {
    const episodesResponse = await fetch(`${API}/episode`);
    const episodes = await episodesResponse.json();

    return episodes.results;
  } catch {
    console.error("ERROR GETTING EPISODES");
    return [];
  }
};

const fetchEpisodesThenPopulate = async () => {
  const allEpisodes = await fetchAllEpisodes();

  const populatedEpisodes = await Promise.all(
    allEpisodes.map(async (episode) => ({
      ...episode,
      characters: await fetchCharacters(episode.characters),
    }))
  );
  console.log(populatedEpisodes);
};

fetchEpisodesThenPopulate();
