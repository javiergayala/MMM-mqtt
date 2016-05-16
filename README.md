# MMM-mqtt

This is an extension for the [MagicMirror²](https://github.com/MichMich/MagicMirror).  It provides the ability to subscribe to MQTT topics and display them.

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/javiergayala/MMM-mqtt.git`. A new folder will appear, likely called `MMM-mqtt`.  Navigate into it.
2. Execute `npm install` to install the node dependencies.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-mqtt',
		position: 'top_right',	// This can be any of the regions. Best results in left or right regions.
		header: 'Living Room Temperature', // This is optional
		config: {
			// See 'Configuration options' for more information.
		}
	}
]
````

## Configuration options

The following options can be configured:

| Option  | Description  |
|---|---|
| `mqttServer`  | Connection string for the server to connect to (`mqtt://localhost`)  |
| `loadingText`  | Text to display while waiting for data to load  |
| `topic`  | MQTT Topic to subscribe to on the server (`sensors/temperature/livingroom`)  |
| `showTitle`  | Boolean to show/hide a title (default: `false`)  |
| `title`  | Title to show if `showTitle` is `true`  |
| `interval`  | Refresh interval, not including MQTT subscription deliveries. (default: `300000`)  |
| `postText`  | Text to append after the data received from MQTT (default: `''`)  |

## Dependencies
- [mqtt](https://www.npmjs.com/package/mqtt) (installed via `npm install`)

The MIT License (MIT)
=====================

Copyright © 2016 Javier G. Ayala

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
