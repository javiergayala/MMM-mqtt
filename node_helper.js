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

  getMqtt: function(config) {
    var self = this;
    var client = mqtt.connect(config.mqttServer);

    client.on('connect', function() {
      client.subscribe(config.topic);
    });

    client.on('error', function(error) {
      console.log('*** MQTT JS ERROR ***: ' + error);
      self.sendSocketNotification('ERROR', {
        type: 'notification',
        title: 'MQTT Error',
        message: 'The MQTT Client has suffered an error: ' + error
      });
    });

    client.on('offline', function() {
      console.log('*** MQTT Client Offline ***');
      self.sendSocketNotification('ERROR', {
        type: 'notification',
        title: 'MQTT Offline',
        message: 'MQTT Server is offline.'
      });
      client.end();
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
