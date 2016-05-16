'use strict';

/* Magic Mirror
 * Module: MMM-mqtt
 *
 * By Javier Ayala http://www.javierayala.com/
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var mqtt = require('mqtt');

module.exports = NodeHelper.create({
  start: function() {
    console.log('MMM-mqtt started ...');
  },

  getMqtt: function(payload) {
    var self = this;
    var client = mqtt.connect(payload.mqttServer);

    client.on('connect', function() {
      client.subscribe(payload.topic);
    });

    client.on('error', function(error) {
      console.log('*** MQTT JS ERROR ***: ' + error);
    });

    client.on('offline', function() {
      console.log('*** MQTT Client Offline ***');
    });

    client.on('message', function(topic, message) {
      self.sendSocketNotification('MQTT_DATA', {'topic':topic, 'data':message.toString()});
      // client.end();
    });
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'MQTT_SERVER') {
      this.getMqtt(payload);
    }
  }
});
