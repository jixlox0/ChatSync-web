export class WebSocketService {
  private socket: WebSocket | null = null

  constructor(private url: string) {}

  connect() {
    let token = localStorage.getItem('token')
    this.socket = new WebSocket(this.url + token.replace(/\"/g, ''))

    this.socket.onopen = () => {
      console.log('WebSocket connected')
    }

    this.socket.onmessage = (event) => {
      console.log('message recived', event.data)
    }

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error)
    }

    this.socket.onclose = () => {
      console.log('WebSocket disconnected')
    }
  }

  sendMessage(message: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message)
    } else {
      console.error('websocket was closed.')
    }
  }

  close() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }
}
