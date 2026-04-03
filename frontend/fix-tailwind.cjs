const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace string patterns correctly based on warnings:
  // e.g. bg-white/[0.03] -> bg-white/3
  content = content.replace(/\[0\.0(\d)\]/g, '$1');
  
  // Also replace gradients: bg-gradient-to-r -> bg-linear-to-r
  content = content.replace(/bg-gradient-to-([a-z]+)/g, 'bg-linear-to-$1');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed:', file);
  }
});
