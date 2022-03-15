import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: '8ea76e49cefea39da043f1d06fe2770b' },
});
