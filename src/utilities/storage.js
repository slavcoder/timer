export const storage = {
  set: (name, value) => {
    let item = JSON.stringify(value)
    localStorage.setItem(name, item)
  },
  get: (name, value) => {
    let item = JSON.parse(localStorage.getItem(name))
    if(!item) {
      storage.set(name, value)
      item = value
    }
    return item
  },
}