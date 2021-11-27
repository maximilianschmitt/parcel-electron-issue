const Parcel = require('@parcel/core').default

const bundler = new Parcel({
	entries: 'src/index.html',
	targets: ['default'],
	serveOptions: {
		port: 4848,
	},
	hmrOptions: {
		port: 4848,
	},
	additionalReporters: [
		{
			packageName: '@parcel/reporter-cli',
			resolveFrom: __filename,
		},
	],
})

let readySent = false
bundler.watch((err, buildEvent) => {
	if (buildEvent.type === 'buildSuccess') {
		if (!readySent) {
			process.send('ready')
			readySent = true
		}
	}
})
