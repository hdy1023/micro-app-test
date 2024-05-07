const config = {
  keepAlive: true,
  apps: [
    {
      name: 'app1',
      url: 'http://127.0.0.1:9001/',
      routerMode:'native',
      activeRule: '/app1',
      pages: ['/pageC', '/pageD', '/pageE', '/pageF']
    },
    {
      name: 'app2',
      url: 'http://127.0.0.1:9002/',
      routerMode:'native',
      activeRule: '/app2',
      pages: ['/pageG', '/pageH', '/pageI', '/pageJ','/pageK','/pageL']
    },
  ]
}

export default config

export const routerBase = '/main'