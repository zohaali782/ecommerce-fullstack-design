/**
 * fix-flags.js
 *
 * Replaces all flagcdn.com flag image URLs with local /flags/*.svg paths
 * across every .jsx file in src/, so flags load from your own public
 * folder instead of depending on an external CDN.
 *
 * Usage:
 *   1. Place this file in your `frontend` folder (same level as `src` and `public`).
 *   2. Make sure public/flags/pk.svg, de.svg, us.svg, ae.svg exist.
 *   3. Run:  node fix-flags.js
 *   4. Restart your dev server.
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "src");

// Matches things like:
//   https://flagcdn.com/w20/${selectedCountry}.png
//   https://flagcdn.com/w40/${["ae","au",...][i]}.png
//   https://flagcdn.com/w20/de.png   (hard-coded country code)
const FLAGCDN_REGEX = /https:\/\/flagcdn\.com\/w\d+\/(.*?)\.png/g;

function walk(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith(".jsx")) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function fixFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  let changedCount = 0;

  const updated = original.replace(FLAGCDN_REGEX, (match, codePart) => {
    changedCount++;
    return `/flags/${codePart}.svg`;
  });

  if (changedCount > 0) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(
      `✔ ${path.relative(__dirname, filePath)} — ${changedCount} replacement(s)`,
    );
  }

  return changedCount;
}

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`❌ Could not find "src" folder at: ${SRC_DIR}`);
    console.error(`   Make sure this script sits next to your "src" folder.`);
    process.exit(1);
  }

  const jsxFiles = walk(SRC_DIR);
  let totalFiles = 0;
  let totalReplacements = 0;

  for (const file of jsxFiles) {
    const count = fixFile(file);
    if (count > 0) {
      totalFiles++;
      totalReplacements += count;
    }
  }

  console.log("\n──────────────────────────────");
  console.log(
    `Done! Updated ${totalFiles} file(s), ${totalReplacements} total replacement(s).`,
  );
  console.log("──────────────────────────────");

  if (totalReplacements === 0) {
    console.log("No flagcdn.com URLs found — nothing to change.");
  } else {
    console.log("\nNext steps:");
    console.log("1. Make sure these files exist in your public/flags folder:");
    console.log("   public/flags/pk.svg");
    console.log("   public/flags/de.svg");
    console.log("   public/flags/us.svg");
    console.log("   public/flags/ae.svg");
    console.log("2. Restart your dev server (npm run dev).");
    console.log("3. Hard refresh the browser (Ctrl+Shift+R).");
  }
}

main();
