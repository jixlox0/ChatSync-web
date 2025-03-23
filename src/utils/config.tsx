interface Config {
  timeout: number
  api_url: string
  environment: string
}

const timeout = 10000
const api_url = 'http://localhost:8081/api'
const environment = 'local'

const getConfig = (): Config => {
  switch (environment) {
    case 'local':
      return {
        timeout: timeout,
        api_url: api_url,
        environment: environment,
      }
  }
}

export default getConfig()
