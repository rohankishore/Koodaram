const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

const COUNTER_FILE = path.join(__dirname, 'browse_count.txt');

// Ensure the counter file exists
if (!fs.existsSync(COUNTER_FILE)) {
  fs.writeFileSync(COUNTER_FILE, '0');
}

app.use(express.json());

app.post('/api/track-browse', (req, res) => {
  fs.readFile(COUNTER_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Read error' });
    let count = parseInt(data, 10) || 0;
    count += 1;
    fs.writeFile(COUNTER_FILE, count.toString(), err => {
      if (err) return res.status(500).json({ error: 'Write error' });
      res.status(200).json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
