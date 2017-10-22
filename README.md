# MMM-mqtt

This is an extension for the [MagicMirror²](https://github.com/MichMich/MagicMirror).  It provides the ability to subscribe to MQTT topics and display them.

## Installation
1. Ensure that you have the necessary libraries/clients for mqtt installed on the computer that will be running this extension.  (For example, running `sudo apt-get install mosquitto mosquitto-clients` on Debian-based distributions.)
2. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/javiergayala/MMM-mqtt.git`. A new folder will appear, likely called `MMM-mqtt`.  Navigate into it.
3. Execute `npm install` to install the node dependencies.

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
| `mqttServer`  | Connection string for the server to connect to (e.g. `mqtt://localhost`) **See:** Server URL  |
| `loadingText`  | Text to display while waiting for data to load  |
| `topic`  | MQTT Topic to subscribe to on the server (`sensors/temperature/livingroom`)  |
| `showTitle`  | Boolean to show/hide a title (default: `false`)  |
| `title`  | Title to show if `showTitle` is `true`  |
| `interval`  | Refresh interval, not including MQTT subscription deliveries. (default: `300000`)  |
| `postText`  | Text to append after the data received from MQTT (default: `''`)  |
| `mode` | Possible values: `send` or `receive` **default**

## Server URL
The server URL can be configured with all options supported by [URL.parse](https://nodejs.org/api/url.html#url_url_strings_and_url_objects). The format used is

```
   mqtt:    //    user   :   pass   @ some.host.com : 1883
| protocol |  | username | password |   hostname    | port |
```

Supported protocols include:
- mqtt
- mqtts

## Mode

By default the module will receive MQTT messages from the configured topic and display these. MMM-mqtt can also be used to broadcast local MagicMirror² notifications from modules to an MQTT topic. A sending module doesn't have to be displayed. A sample minimal config for sending:

```javascript
{
	module: "MMM-mqtt",
	config: {
		mqttServer: "mqtts://loclhost:8883",
		topic: "home/living/magicmirror",
		mode: "send"
	}
}
```


## Dependencies
- [mqtt](https://www.npmjs.com/package/mqtt) (installed via `npm install`)

## Contributing Guidelines

Contributions of all kinds are welcome, not only in the form of code but also with regards bug reports and documentation.

Please keep the following in mind:

- **Bug Reports**:  Make sure you're running the latest version. If the issue(s) still persist: please open a clearly documented issue with a clear title.
- **Minor Bug Fixes**: Please send a pull request with a clear explanation of the issue or a link to the issue it solves.
- **Major Bug Fixes**: please discuss your approach in an GitHub issue before you start to alter a big part of the code.
- **New Features**: please please discuss in a GitHub issue before you start to alter a big part of the code. Without discussion upfront, the pull request will not be accepted / merged.

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
