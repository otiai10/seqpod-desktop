/* eslint no-console:0 */
var winstaller = require('electron-winstaller');

winstaller.createWindowsInstaller({
  appDirectory:    './builds/win32/SeqPod-win32-x64/',
  outputDirectory: './builds/win32/SeqPod-installer',
  author:          'Hiromu Ochiai',
  exe:             'SeqPod.exe'
})
  .then(() => console.log('It worked!'))
  .catch(e => console.log(`No dice: ${e.message}`));
