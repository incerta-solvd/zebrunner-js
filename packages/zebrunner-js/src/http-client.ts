import * as https from 'https'
import * as http from 'http'

const formDataEncode = (
  data: { [k: string]: string | number | Array<string | number> },
  boundaryCode: string
) => {
  const boundaryItem = (key: string, value: string | number, boundaryCode: string) =>
    `--${boundaryCode}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}`

  const queryStrings = Object.keys(data).map((key) => {
    const value = data[key]

    if (typeof value === 'string' || typeof value === 'number') {
      return [boundaryItem(key, value, boundaryCode)]
    }

    if (value instanceof Buffer) {
      return [boundaryItem(key, value.toString(), boundaryCode)]
    }

    return value.map((v) => boundaryItem(key, v, boundaryCode))
  })

  const reducedStrings = queryStrings.reduce((a, b) => [...a, ...b])

  return reducedStrings.join('\r\n') + `\r\n--${boundaryCode}--`
}


export default function makeHttpClient(cfg: { accessToken: string; serviceURL: string }) {
  const url = new URL(cfg.serviceURL)
  const isHTTPS = url.protocol.includes('https')
  const client = isHTTPS ? https : http

  const commonOptions: https.RequestOptions = {
    protocol: url.protocol,
    hostname: url.hostname,
    port: url.port || isHTTPS ? 443 : 80,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cfg.accessToken}`,
    },
  }

  const makeReqHandler = (method: 'POST' | 'PUT') => <T = any>(
    path: string,
    data?: any,
    options?: {
      headers?: { [k: string]: string }
    }
  ): Promise<T> =>
    new Promise((resolve, reject) => {
      const body = (() => {
        const contentType = options?.headers?.['Content-Type']
  
        switch(contentType) {
          case 'image/png':
            return data
          case 'multipart/form-data':
            const boundaryCode = 'gc0p4Jq0M2Yt08jU534c0p'

            if (options?.headers?.['Content-Type']) {
              options.headers['Content-Type'] = `multipart/form-data; boundary=${boundaryCode}`
            }

            return formDataEncode(data, boundaryCode)
          default:
            return JSON.stringify(data || {})
        }
      })()

      const reqOptions: https.RequestOptions = {
        ...commonOptions,
        method,
        path,
        headers: {
          ...commonOptions.headers,
          'Content-Length': body.length,
          ...options?.headers
        },
      }

      const req = client.request(reqOptions, (res) => {
        let chunks = ''

        res.on('data', (chunk) => (chunks += chunk))
        res.on('error', (error) => reject(error))
        res.on('end', () => {
          try {
            resolve(chunks ? JSON.parse(chunks) : {})
          } catch(e) {
            console.log(chunks)
            resolve({} as any)
          }
        })
      })

      req.write(body)
      req.end()
    })

  return {
    post: makeReqHandler('POST'),
    put: makeReqHandler('PUT'),
  }
}
