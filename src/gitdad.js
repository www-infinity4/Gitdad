'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const SIGNAL_FILE = process.env.GITDAD_SIGNAL_FILE || path.join(os.homedir(), '.gitdad_signal.json');

/**
 * Load the current signal state from disk.
 * Returns null if no signal has been set.
 * @returns {{ status: string, message: string, timestamp: string } | null}
 */
function loadSignal() {
  try {
    const raw = fs.readFileSync(SIGNAL_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Save a signal to disk.
 * @param {{ status: string, message: string, timestamp: string }} signal
 */
function saveSignal(signal) {
  fs.writeFileSync(SIGNAL_FILE, JSON.stringify(signal, null, 2), 'utf8');
}

/**
 * dad pings to signal he is okay and optionally shares his location/message.
 * @param {string} [message] - Optional status message from dad.
 * @returns {{ status: string, message: string, timestamp: string }}
 */
function ping(message) {
  const signal = {
    status: 'OK',
    message: message || "Don't worry, I'm fine!",
    timestamp: new Date().toISOString(),
  };
  saveSignal(signal);
  return signal;
}

/**
 * Start a honing signal – dad is broadcasting that he needs to be found.
 * @param {string} [message] - Optional details about dad's situation.
 * @returns {{ status: string, message: string, timestamp: string }}
 */
function hone(message) {
  const signal = {
    status: 'HONING',
    message: message || 'Looking for the exit of this hardware store...',
    timestamp: new Date().toISOString(),
  };
  saveSignal(signal);
  return signal;
}

/**
 * Check the latest signal from dad.
 * @returns {{ status: string, message: string, timestamp: string } | null}
 */
function find() {
  return loadSignal();
}

/**
 * Clear the current signal (dad has been found).
 */
function clear() {
  try {
    fs.unlinkSync(SIGNAL_FILE);
    return true;
  } catch {
    return false;
  }
}

module.exports = { ping, hone, find, clear, SIGNAL_FILE };
