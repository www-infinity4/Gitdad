# Gitdad

> 📡 A robot honing signal in case you've lost your dad.

**Gitdad** is a lightweight CLI tool that lets dad broadcast his whereabouts and lets the rest of the family check in. Started as a GitHub meme token, but genuinely useful for anyone who keeps misplacing their dad at IKEA.

---

## Installation

```bash
npm install -g gitdad
```

Or run directly from the repo:

```bash
git clone https://github.com/www-infinity4/Gitdad.git
cd Gitdad
npm link
```

---

## Usage

```
gitdad ping [message]   Dad signals he is okay (optionally with a message)
gitdad hone [message]   Dad activates honing signal to be found
gitdad find             Check the latest signal from dad
gitdad clear            Mark dad as found and clear the signal
```

### Examples

**Dad signals he's fine:**
```bash
gitdad ping "Just at the BBQ, back soon"
```

**Dad is lost and needs finding:**
```bash
gitdad hone "Lost in IKEA, send help"
```

**Family checks in on dad:**
```bash
gitdad find
# 🔍 Latest signal from dad:
# 📡  Status : HONING
#    Message: Lost in IKEA, send help
#    Time   : 3/25/2026, 9:45:46 PM
```

**Dad has been found:**
```bash
gitdad clear
# 🎉 Signal cleared. Dad has been found!
```

---

## How it works

Gitdad stores the latest signal in `~/.gitdad_signal.json`. The file is local by default — share it over a network drive, sync folder, or any file-sharing solution of your choice to make it work across devices.

---

## Development

```bash
npm test
```

---

## License

MIT
<script src="https://www-infinity4.github.io/Mint-For-Infinity/infinity-wallet-menu.js" defer></script>
