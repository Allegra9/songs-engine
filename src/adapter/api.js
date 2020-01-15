const API_ROOT = `https://itunes.apple.com/search?media=music&term=`;

export const getSongs = song => {
  return fetch(`${API_ROOT}${song}`, {
    method: "GET"
  }).then(res => res.json());
};
