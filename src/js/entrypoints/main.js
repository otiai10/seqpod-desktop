import {app, BrowserWindow} from 'electron';

// Singleton Window Object per process
let win = null;
function initialize() {
  if (win !== null) return;
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(`file://${__dirname}/html/index.html`);
}

app.on('ready', initialize);
app.on('window-all-closed', app.quit);
app.on('activate', initialize);
