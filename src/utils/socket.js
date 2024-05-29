import { io } from 'socket.io-client';
import {URL_SERVER} from '@env'

export const socket = io(URL_SERVER); 