export const storage = {
  set: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
  },
  get: (name, value) => {
    let item = JSON.parse(localStorage.getItem(name))

    if (!item) {
      storage.set(name, value)
      item = value
    }

    return item
  },
}