#!/usr/bin/env node
'use strict';

const { ping, hone, find, clear } = require('./gitdad');

const STATUS_ICONS = {
  OK: '✅',
  HONING: '📡',
};

function formatSignal(signal) {
  const icon = STATUS_ICONS[signal.status] || '❓';
  const when = new Date(signal.timestamp).toLocaleString();
  return `${icon}  Status : ${signal.status}\n   Message: ${signal.message}\n   Time   : ${when}`;
}

const [, , command, ...args] = process.argv;
const message = args.join(' ') || undefined;

switch (command) {
  case 'ping': {
    const signal = ping(message);
    console.log('📶 Signal sent!\n');
    console.log(formatSignal(signal));
    break;
  }

  case 'hone': {
    const signal = hone(message);
    console.log('📡 Honing signal activated!\n');
    console.log(formatSignal(signal));
    break;
  }

  case 'find': {
    const signal = find();
    if (!signal) {
      console.log("🔍 No signal from dad yet. Have you tried the hardware store?");
    } else {
      console.log("🔍 Latest signal from dad:\n");
      console.log(formatSignal(signal));
    }
    break;
  }

  case 'clear': {
    const cleared = clear();
    if (cleared) {
      console.log('🎉 Signal cleared. Dad has been found!');
    } else {
      console.log('ℹ️  No active signal to clear.');
    }
    break;
  }

  default: {
    console.log(`
 ██████╗ ██╗████████╗██████╗  █████╗ ██████╗ 
██╔════╝ ██║╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗
██║  ███╗██║   ██║   ██║  ██║███████║██║  ██║
██║   ██║██║   ██║   ██║  ██║██╔══██║██║  ██║
╚██████╔╝██║   ██║   ██████╔╝██║  ██║██████╔╝
 ╚═════╝ ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝╚═════╝ 

📡 Robot honing signal — in case you've lost your dad.

Usage:
  gitdad ping [message]   Dad signals he is okay (optionally with a message)
  gitdad hone [message]   Dad activates honing signal to be found
  gitdad find             Check the latest signal from dad
  gitdad clear            Mark dad as found and clear the signal

Examples:
  gitdad ping "Just at the BBQ, back soon"
  gitdad hone "Lost in IKEA, send help"
  gitdad find
  gitdad clear
`);
    break;
  }
}
