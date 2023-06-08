const si = require('systeminformation');
const readJson = require('read-package-json');
const path = require('path');
const axios = require('axios');

const trackedPackageJsonPath = path.join(process.cwd(), 'package.json');
const [targetPath] = path.dirname(process.argv[1]).split('node_modules');
// const targetPackageJsonPath = path.join(targetPath, 'package.json');

const packageJsonPath = path.join(
    path.dirname(__dirname),
    '..',
    'package.json'
);

const targetPackageJsonPath = path.join(
    path.dirname(process.argv[1]),
    '..',
    '..',
    '..',
    'package.json'
);
const getPackageJson = path =>
    new Promise((resolve, reject) =>
        readJson(
            path,
            null,
            false,
            (err, json) =>
                err
                    ? reject(
                          `There was an error reading the file with path:${path}`
                      )
                    : resolve(json)
        )
    );

const getInfos = () =>
  new Promise(resolve => {
    const data = {};
    return si
      .osInfo()
      .then(os => {
        data.os = os;
        return si.versions();
      })
      .then(versions => {
        data.versions = versions;
        return si.time();
      })
      .then(time => {
        data.time = time;
        return si.shell();
      })
      .then(() => resolve(data))
      .catch(e => console.log(e));
  });

  (async () => {
    try {
      const obj = await getInfos(); 
      const { name, version } = await getPackageJson(targetPackageJsonPath)
      obj.pkg = {};
      obj.pkg.name = name;
      obj.pkg.version = version;
      await axios.post('https://xten-tel-server.netlify.app/.netlify/functions/api/install', obj, {
        'Content-Type': 'application/json'
      })
    } catch (e) {
      console.log('e', e)
    }
  })();