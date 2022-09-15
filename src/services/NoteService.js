import { LocalStorageService } from './LocalStorageService'
export const STORAGE_KEY = 'notes'
export const NoteService = {
  
  storeAll (items) {
    LocalStorageService.setItem(STORAGE_KEY, items)
  },
  fetchNotes () {
    return LocalStorageService.getItem(STORAGE_KEY, [])
  },
  getItemById (noteId) {
    const items = LocalStorageService.getItem(STORAGE_KEY, [])
    const index = items.findIndex(i => i.noteId === noteId)
    if (index === -1) return
    return items[index]
  },
  updateItem (noteId, payload) {
    const items = NoteService.fetchNotes()
    const index = items.findIndex(i => i.noteId === noteId)
    if (index === -1) {
      items.push(payload)
    } else {
      items.splice(index, 1, payload)
    }
    NoteService.storeAll(items)
  },
  removeItem (noteId) {
    const items = NoteService.fetchNotes()
    const index = items.findIndex(i => i.noteId === noteId)
    items.splice(index, 1)
    NoteService.storeAll(items)
  }
}
