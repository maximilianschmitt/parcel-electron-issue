const execa = require('execa')
const { fork, spawn } = require('child_process')

let electronDev
let clientDev

startClientDev().then(startElectronDev)

function startClientDev() {
	return new Promise((resolve) => {
		clientDev = fork('../client/scripts/dev', [], { cwd: 'client', detached: false })

		clientDev.on('message', (msg) => {
			if (msg === 'ready') {
				resolve()
			}
		})
	})
}

function startElectronDev() {
	electronDev = spawn('yarn', ['ts:dev', '--onFirstSuccess', '"yarn electron:dev"'], {
		cwd: 'electron',
		stdio: ['ignore', 'inherit', 'inherit'],
		shell: true,
	})
}
