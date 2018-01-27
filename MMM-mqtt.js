'use strict';
/* global Module */

/* Magic Mirror
 * Module: MMM-mqtt
 *
 * By Javier Ayala http://www.javierayala.com/
 * MIT Licensed.
 */

Module.register('MMM-mqtt', {

  defaults: {
    mqttServer: 'mqtt://test.mosquitto.org',
    mode: 'receive',
    loadingText: 'Loading MQTT Data...',
    topic: '',
    showTitle: false,
    title: 'MQTT Data',
    interval: 300000,
    postText: '',
    roundValue: false,
    decimals: 2
  },

  start: function() {
    Log.info('Starting module: ' + this.name);
    this.loaded = false;
    this.mqttVal = '';
    this.updateMqtt(this);
  },

  updateMqtt: function(self) {
    self.sendSocketNotification('MQTT_SERVER', { mqttServer: self.config.mqttServer, topic: self.config.topic, mode: self.config.mode });
    setTimeout(self.updateMqtt, self.config.interval, self);
  },

  getDom: function() {
    var wrapper = document.createElement('div');

    if (!this.loaded) {
      wrapper.innerHTML = this.config.loadingText;
      wrapper.className = "loading medium";
      return wrapper;
    }

    if (this.config.showTitle) {
      var titleDiv = document.createElement('div');
      titleDiv.innerHTML = this.config.title;
      titleDiv.className = "title medium";
      wrapper.appendChild(titleDiv);
    }

    var mqttDiv = document.createElement('div');
    mqttDiv.innerHTML = this.roundValue(this.mqttVal.toString()) + this.config.postText;
    mqttDiv.className = "value bright large light";
    wrapper.appendChild(mqttDiv);

    return wrapper;
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'MQTT_DATA' && payload.topic === this.config.topic) {
      this.mqttVal = payload.data.toString();
      this.loaded = true;
      this.updateDom();
    }

    if (notification === 'ERROR') {
      this.sendNotification('SHOW_ALERT', payload);
    }
  },

  notificationReceived: function(notification, payload, sender) {
    var self = this;

    if (self.config.mode !== "send") {
      return;
    }

    var topic;
    if (sender) {
      Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name + ": ", payload);
      topic = this.config.topic + "/" + sender.name + "/" + notification;
    } else {
      Log.log(this.name + " received a system notification: " + notification + ": ", payload);
      topic = this.config.topic + "/" + notification;
    }

    this.sendSocketNotification("MQTT_SEND", {
      mqttServer: self.config.mqttServer,
      topic: topic,
      payload: payload
    });
  },

  roundValue: function(value) {
    if (this.config.roundValue) {
      value =  parseFloat(value).toFixed(this.config.decimals);
    }

    return value;
  },

  getStyles: function() {
    return ["MMM-mqtt.css"];
  },
});
