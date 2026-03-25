'use strict';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Redirect the signal file to a temp location so tests don't touch ~/.gitdad_signal.json
const TEST_SIGNAL_FILE = path.join(os.tmpdir(), '.gitdad_signal_test.json');
process.env.GITDAD_SIGNAL_FILE = TEST_SIGNAL_FILE;

const gitdad = require('../src/gitdad');

describe('gitdad core', () => {
  before(() => {
    try { fs.unlinkSync(TEST_SIGNAL_FILE); } catch {}
  });

  after(() => {
    try { fs.unlinkSync(TEST_SIGNAL_FILE); } catch {}
  });

  describe('ping()', () => {
    it('returns an OK signal with default message', () => {
      const signal = gitdad.ping();
      assert.equal(signal.status, 'OK');
      assert.ok(signal.message.length > 0);
      assert.ok(signal.timestamp);
    });

    it('returns an OK signal with custom message', () => {
      const signal = gitdad.ping('At the shops');
      assert.equal(signal.status, 'OK');
      assert.equal(signal.message, 'At the shops');
    });

    it('persists the signal to disk', () => {
      gitdad.ping('Persisted ping');
      const raw = fs.readFileSync(TEST_SIGNAL_FILE, 'utf8');
      const saved = JSON.parse(raw);
      assert.equal(saved.status, 'OK');
      assert.equal(saved.message, 'Persisted ping');
    });
  });

  describe('hone()', () => {
    it('returns a HONING signal with default message', () => {
      const signal = gitdad.hone();
      assert.equal(signal.status, 'HONING');
      assert.ok(signal.message.length > 0);
    });

    it('returns a HONING signal with custom message', () => {
      const signal = gitdad.hone('Lost in IKEA');
      assert.equal(signal.status, 'HONING');
      assert.equal(signal.message, 'Lost in IKEA');
    });
  });

  describe('find()', () => {
    it('returns null when no signal exists', () => {
      try { fs.unlinkSync(TEST_SIGNAL_FILE); } catch {}
      const signal = gitdad.find();
      assert.equal(signal, null);
    });

    it('returns the last saved signal', () => {
      gitdad.ping('Test find');
      const signal = gitdad.find();
      assert.ok(signal);
      assert.equal(signal.status, 'OK');
      assert.equal(signal.message, 'Test find');
    });
  });

  describe('clear()', () => {
    it('returns true and removes the signal file', () => {
      gitdad.ping('To be cleared');
      const result = gitdad.clear();
      assert.equal(result, true);
      assert.equal(gitdad.find(), null);
    });

    it('returns false when there is nothing to clear', () => {
      try { fs.unlinkSync(TEST_SIGNAL_FILE); } catch {}
      const result = gitdad.clear();
      assert.equal(result, false);
    });
  });
});

