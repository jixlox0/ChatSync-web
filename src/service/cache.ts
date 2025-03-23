export class LocalCache {
  private static _instance: LocalCache

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache<T>(key: string): T | undefined {
    const value = window.localStorage.getItem(key)
    if (value) {
      let jsonObj: any = JSON.parse(value)
      return jsonObj as T
    }
    return undefined
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}
