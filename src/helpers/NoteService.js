import { LocalStorageService } from './LocalStorageService'
export const STORAGE_KEY = 'notes'

export const NoteService = {
  //Хранит все предоставленные элементы заметок
  storeAll(items) {
    LocalStorageService.setItem(STORAGE_KEY, items)
  },
  getAllNotes() {
    return LocalStorageService.getItem(STORAGE_KEY, [])
  },
  getItemById(noteId) {
    const items = LocalStorageService.getItem(STORAGE_KEY, [])
    const index = items.findIndex(i => i.noteId === noteId)
    if (index === -1) return
    return items[index]
  },
  updateItem(noteId, payload) {
    const items = NoteService.getAllNotes()
    const index = items.findIndex(i => i.noteId === noteId)
    if (index === -1) {
      items.push(payload)
    } else {
      items.splice(index, 1, payload)
    }
    NoteService.storeAll(items)
  },
  removeItem(noteId) {
    const items = NoteService.getAllNotes()
    const index = items.findIndex(i => i.noteId === noteId)
    items.splice(index, 1)
    NoteService.storeAll(items)
  }
}
