import path from 'path';
import {app, BrowserWindow} from 'electron';

const entryUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:6789/index.html'
  : `file://${path.join(__dirname, 'index.html')}`;

let window = null;

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (window) {
      if (window.isMinimized()) window.restore()
      window.focus()
    }
  })

  app.on('ready', () => {
    window = new BrowserWindow({width: 800, height: 600,
      webPreferences: {
        nodeIntegration: true
      }  
    });
    window.loadURL(entryUrl);
    window.on('closed', () => window = null);
  });
}

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});
