import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage | null = null;

  constructor(private store: Storage) {
    this.init();
  }

  async init() {
    if (this.storage == null) {
      const storage = await this.store.create();
      this.storage = storage;
    }
  }

  // Function to add item to local storage
  async set(key: string, value: any) {
    await this.init();
    await this.storage.set(key, value);
  }

  // Function to get item from local storage
  async get(key: string) {
    await this.init();
    return await this.storage.get(key);;
  }

  // Function to remove item from local storage
  async remove(key: string) {
    await this.init();
    await this.storage.remove(key);
  }

  /// Function to clear all local storage
  async clearAll() {
    await this.storage.clear();
  }
}
