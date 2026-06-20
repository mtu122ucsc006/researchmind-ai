const USER_KEY = 'researchmind_user'
const TOKEN_KEY = 'researchmind_token'

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
}

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function logout() {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(TOKEN_KEY)
}
