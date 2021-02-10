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
    this.clients = [];
  },

  connectMqtt: function(config) {
    var self = this;
    var client;

    if(typeof self.clients[config.mqttServer] === "undefined") {
      console.log("Creating new MQTT client for url: ", config.mqttServer);
      client = mqtt.connect(config.mqttServer);
      self.clients[config.mqttServer] = client;

      client.on('error', function(error) {
        console.error('*** MQTT JS ERROR ***: ' + error);
        self.sendSocketNotification('ERROR', {
          type: 'notification',
          title: 'MQTT Error',
          message: 'The MQTT Client has suffered an error: ' + error
        });
      });

      client.on('offline', function() {
        console.error('*** MQTT Client Offline ***');
        self.sendSocketNotification('ERROR', {
          type: 'notification',
          title: 'MQTT Offline',
          message: 'MQTT Server is offline.'
        });
      });

      client.on('connect', function(connack) {
        console.log('MQTT Client connected to ' + config.mqttServer);

        if(config.mode !== 'send') {
          console.log('MQTT Client subscribing to ' + config.topic);

          client.on('message', function(topic, message) {
            self.sendSocketNotification('MQTT_DATA', {'topic':topic, 'data':message.toString()});
          });
          client.subscribe(config.topic);
        }
      });

      client.on('reconnect', function(err) {
        self.sendSocketNotification('ERROR', {
          type: 'notification',
          title: 'MQTT Reconnect',
          message: 'MQTT reconnect.'
        });
        console.log(self.name + " reconnect:", err);
      });
    } else {
      client = self.clients[config.mqttServer];
    }
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'MQTT_SERVER') {
      this.connectMqtt(payload);
    } else if(notification == 'MQTT_SEND') {
      var client = this.clients[payload.mqttServer];
      if(typeof client !== "undefined") {
        client.publish(payload.topic, JSON.stringify(payload.payload));
      }
    }
  }
});
