const childProcess = require('child_process')
const appPath = ['main', 'app1', 'app2']
const maxBuffer = 5000 * 1024

const run = () => {
  appPath.forEach(path => {
    const process = childProcess.exec(
      'yarn run serve',
      { cwd: path, maxBuffer: maxBuffer },
      (error) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return
        }
      }
    )
    process.stdout.on('data', (data) => {
      if (data.indexOf('- Local:') > -1) {
        console.log(`${path}:`);
        console.log(data);
      }
    });
  })
}

run()