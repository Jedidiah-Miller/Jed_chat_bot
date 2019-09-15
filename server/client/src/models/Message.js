
export default class Message {
  /**
   * 
   * @param {string} uid user id - author of the message
   * @param {string} text message content
   * @param {Date} createdAt time the message was composed
   */
  constructor(uid, text, createdAt = Date.now()) {
    this.uid = uid;
    this.text = text;
    this.createdAt = createdAt;
  }
}