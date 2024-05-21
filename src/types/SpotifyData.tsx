import axios from 'axios';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, RAPIDAPI_KEY, RAPIDAPI_HOST, } from '@env';

let token: any

class SpotifyAPI {

    static async getToken() {
        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
            {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            token = response.data.access_token;
            return token;
        } catch (error) {
            console.error('Error al obtener el token:', error);
            throw error;
        }
    }
    
      static async getTrackInfo(trackId) {
        try {
          if (!token) {
            await this.getToken();
          }
          
          const response = await axios.get(
            `https://api.spotify.com/v1/tracks/${trackId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          const { album, artists, name } = response.data;
          const albumName = album.name;
          const artistName = artists[0].name;
          const imageUrl = album.images[0].url;
    
          return { name, artistName, albumName, imageUrl };
        } catch (error) {
          console.error('Error al obtener información de la canción:', error);
          throw error;
        }
      }
      static async getTrackUrl(trackLink: string) {
        trackLink = trackLink.replaceAll(':', '%3A');
        trackLink = trackLink.replaceAll('/', '%2F');
        console.log('PARSED URL: ' + trackLink);
        const url = 'https://spotify-scraper.p.rapidapi.com/v1/track/download?track=' + trackLink;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': RAPIDAPI_HOST
          }
        };
        
        try {
          const response = await fetch(url, options);
          return response.text()
        } catch (error) {
          console.error(error);
        }
      } 

      static async searchSongs(trackName: string) {
        trackName.replaceAll(' ', '+');
        try {
            const response = await axios.get('https://api.spotify.com/v1/search', {
                params: {
                    q: trackName,
                    type: 'track',
                    limit: 5
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener la URL de la canción:', error);
            throw error;
        }
    }
}

export default SpotifyAPI;
