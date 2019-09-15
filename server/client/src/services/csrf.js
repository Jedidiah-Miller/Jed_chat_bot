export default function getCsrf() {
  var cookie = document.getElementById('csrf_token')
  return cookie;
}