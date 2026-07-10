const { existsSync, readFileSync } = require("fs");
const { resolve } = require("path");

const ROOT = resolve(__dirname, "..");

const REQUIRED_DEPENDENCIES = [
  "expo",
  "expo-router",
  "react",
  "react-native",
  "nativewind",
  "tailwindcss",
  "zustand",
  "react-native-reanimated",
  "react-native-gesture-handler",
];

const REQUIRED_CONFIGS = [
  "tailwind.config.js",
  "metro.config.js",
  "babel.config.js",
  "global.css",
  "tsconfig.json",
  "app.json",
];

const REQUIRED_SOURCE_DIRS = [
  "app",
  "components/ui",
  "components/auth",
  "stores",
  "lib",
  "constants",
  "types",
];

let errors = 0;

console.log("\n=== ChitChat Validation ===\n");

// 1. Check package.json dependencies
console.log("Checking dependencies...");
const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf-8"));
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

for (const dep of REQUIRED_DEPENDENCIES) {
  if (!allDeps[dep]) {
    console.log(`  MISSING: ${dep} is not in package.json`);
    errors++;
  } else {
    console.log(`  OK: ${dep}@${allDeps[dep].replace(/^[\^~]/, "")}`);
  }
}

// 2. Check config files
console.log("\nChecking config files...");
for (const file of REQUIRED_CONFIGS) {
  const fullPath = resolve(ROOT, file);
  if (!existsSync(fullPath)) {
    console.log(`  MISSING: ${file}`);
    errors++;
  } else {
    console.log(`  OK: ${file}`);
  }
}

// 3. Check source directories
console.log("\nChecking source directories...");
for (const dir of REQUIRED_SOURCE_DIRS) {
  const fullPath = resolve(ROOT, dir);
  if (!existsSync(fullPath)) {
    console.log(`  MISSING: ${dir}/`);
    errors++;
  } else {
    console.log(`  OK: ${dir}/`);
  }
}

// 4. Check babel config is parseable
console.log("\nChecking babel config...");
try {
  const babel = require(resolve(ROOT, "babel.config.js"));
  if (babel && typeof babel === "function") {
    console.log("  OK: babel.config.js exports a function");
  }
} catch (e) {
  console.log(`  ERROR: ${e.message}`);
  errors++;
}

// 5. Check tailwind config is parseable
console.log("\nChecking tailwind config...");
try {
  const tailwind = require(resolve(ROOT, "tailwind.config.js"));
  if (tailwind && tailwind.theme) {
    console.log("  OK: tailwind.config.js exports valid config");
  }
} catch (e) {
  console.log(`  ERROR: ${e.message}`);
  errors++;
}

// 6. Summary
console.log("\n=== Summary ===");
if (errors === 0) {
  console.log("All checks passed.\n");
} else {
  console.log(`${errors} issue(s) found. Fix them before starting the dev server.\n`);
  process.exit(1);
}
