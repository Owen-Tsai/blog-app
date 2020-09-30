/**
 * used to store token and auth state
 * @type {{auth: boolean, clear(): void, token: null}}
 */
export const sessionData = {
  auth: false,
  token: null,

  clear() {
    this.auth = false
    this.token = null
  }
}

export const authenticated = () => {
  return sessionData.auth
}
