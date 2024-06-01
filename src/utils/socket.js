import { io } from 'socket.io-client';
import {URL_SERVER_LOCAL, URL_SERVER_AZURE} from '@env'

export const socket = io(URL_SERVER_AZURE); 