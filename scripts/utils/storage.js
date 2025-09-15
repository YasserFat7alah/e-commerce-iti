/**
 * StorageManager - Wrapper class for localStorage / sessionStorage.
 * Provides safe read, write, delete, clear and utility methods.
 */
class StorageManager {
    /**
    * @param {storage} storage - storage name ('local': localStorage(default) || 'session': sessionStorage).
    */
    constructor(_type = "local") {
        this.storage = _type === "session" ? sessionStorage : localStorage;
    }

/*======= WRITE IN STORAGE ========*/
    /**
    * Write a value to storage under a key.
    * @param {string} _key - The key name.
    * @param {any} _value - The value to store (will be JSON.stringified).
    */
    write(_key, _value) {
        this.storage.setItem(_key, JSON.stringify(_value));
    }
/*======= READ FROM STORAGE ========*/
    /**
    * Read a value from storage.
    * @param {string} _key - The key name.
    * @param {any} [_fallback=null] - Value to return if key doesn't exist or parsing fails.
    * @returns {any} The parsed value or fallback.
    */
    read(_key, _fallback = null) {
        const data = this.storage.getItem(_key);
        if (data == null) return _fallback;
        try {
        return JSON.parse(data);
        } catch {
        return data || _fallback;
        }
    }

/*======= REMOVE FROM STORAGE ========*/
    /**
    * Remove a key from storage.
    * @param {string} _key - The key to remove.
    */
    remove(_key) {
        this.storage.removeItem(_key);
    }

/*======= CHECK IF EXISTS ========*/
    /**
    * Check if a key exists in storage, optionally also validate it has non-empty data.    
    * Supports all data types (object, array, string, number, boolean).
    * @param {string} _key - The key to check.
    * @param {boolean} [_checkData=false] - If true, also check that the value is not empty.
    * @returns {boolean} True if key exists (and has data if checkData=true).
    */
    exists(_key, _checkData = false) {
        const value = this.read(_key);
        if (value == null) return false; // Returns false if key was not found in storage

        if (!_checkData) return true; // Returns true if you dont want to check value inside
            
        if (Array.isArray(value)) return value.length > 0;
        
        if (typeof value === "object") return Object.keys(value).length > 0;

        return Boolean(value);
    }
/*======= UPADATE A VALUE AT STORAGE ========*/
    /**
    * Update a stored value by applying an updater function.
    * @param {string} _key - The key to update.
    * @param {(prev:any)=>any} _updater - Function that receives old value and returns new one.
    * @param {any} [_fallback=null] - Fallback if key does not exist.
    * @param {boolean} [_autoSave=true] - Whether to save the updated value automatically.
    * @returns {any} The new value (not depending on autoSave).
   */
    update(_key, _updater, _fallback = null) {
        const current = this.read(_key, _fallback);
        const next = (typeof _updater === 'function')
            ? _updater(current)
            : _updater;
        this.write(_key, next);
        return next;
    }

    clear() {
        this.storage.clear();
    }
}

/*======= INSTANCES TO USE ========*/
export const localStore = new StorageManager("local");
export const sessionStore = new StorageManager("session");

