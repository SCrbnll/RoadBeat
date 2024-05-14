import axios from 'axios';

const client_id = '27994d84d064403ea7a488ba6fbbfdab'
const client_secret = 'cd3fb1113fdf4df6b4ba14146a44698c'
let token: any

class SpotifyAPI {

    static async getToken() {
        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
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
      static async getTrackUrl(trackLink: any) {
        const axios = require('axios');
        try {
          const response = await axios.get(
            `https://spotify-scraper.p.rapidapi.com/v1/track/download`,
            {
              headers: {
                'X-RapidAPI-Key': 'afd5847009msh06e0f4959fd28a2p169defjsndc0c513ee5c4',
                'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
              },
              param :{
                track : trackLink
              }
            }
          );
	        console.log(response.data);
        } catch (error) {
          console.error('Error al obtener la URL de la canción:', error);
              throw error;
        };
      } 

      static async searchSongs(trackName: string) {
        trackName.replaceAll(' ', '+');
        console.log(trackName)
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
