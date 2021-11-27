import { app, BrowserWindow } from 'electron'

const { NODE_ENV } = process.env

if (NODE_ENV !== 'production') {
	require('electron-reloader')(module, { ignore: ['src/**/*'], watchRenderer: false })
}

const createWindow = () => {
	const window = new BrowserWindow({
		width: 940,
		height: 670,
		webPreferences: {
			nodeIntegration: true,
		},
	})

	window.loadURL('http://localhost:4848')
	// window.loadFile(path.resolve(__dirname, '../../client/dist/index.html'))
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit())
