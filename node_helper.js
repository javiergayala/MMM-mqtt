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
    self.client = client;

    console.log("Creating new MQTT client: ", config);

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

    if(config.mode !== 'send') {
      client.on('message', function(topic, message) {
        self.sendSocketNotification('MQTT_DATA', {'topic':topic, 'data':message.toString()});
        // client.end();
      });
    }
  },

  socketNotificationReceived: function(notification, payload) {
    var self = this;

    if (notification === 'MQTT_SERVER') {
      this.getMqtt(payload);
    } else if(notification == 'MQTT_SEND') {
      self.client.publish(payload.topic, JSON.stringify(payload.payload));
    }
  }
});
