export const LocalStorageService = {
  getItem (key, fallback) {
    let item = window.localStorage.getItem(key)
    return item ? window.JSON.parse(item) : fallback
   
  },
  setItem (key, value = {}) {
    window.localStorage.setItem(key, window.JSON.stringify(value))
  },
  removeItem (key) {
    window.localStorage.removeItem(key)
  },
  clearAllItems () {
    window.localStorage.clear()
  }
}
