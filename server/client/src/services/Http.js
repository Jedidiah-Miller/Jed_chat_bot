import axios from './axios';

/**
 * ### http service
 * fetch json data from the server at ease
 */
class HttpService {

  path;

  constructor(path) {
    this.path = path;
  }

  create = body => axios.post(`${this.path}/create`, body);

}

/**
 * ### ChatService
 * api for chat crud operations
 */
export const _chat = new HttpService('chat');