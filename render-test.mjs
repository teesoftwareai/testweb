import React from "react";
import { renderToString } from "react-dom/server";

// Provide minimal browser shims needed at import time
globalThis.window = globalThis;
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
globalThis.document = { head: { appendChild: () => {} }, documentElement: {} };

const mods = [
  "./src/App.jsx",
  "./src/admin/AdminLogin.jsx",
  "./src/admin/AdminDashboard.jsx",
  "./src/context/SiteContext.jsx",
  "./src/admin/ListEditor.jsx",
  "./src/admin/SettingsEditor.jsx",
  "./src/admin/Messages.jsx",
  "./src/admin/MediaManager.jsx",
  "./src/admin/adminUtils.jsx",
];

for (const m of mods) {
  try {
    await import(m);
    console.log("OK   ", m);
  } catch (e) {
    console.log("FAIL ", m, "->", e.message);
  }
}
