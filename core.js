(function () {
  const requiredFiles = [
    "image/image.js",
    "audio/audio.js",
    "library/library.js",
    "source/source.js"
  ];

  window.__CORE_LOADED__ = false;

  async function checkCoreIntegrity() {
    for (let file of requiredFiles) {
      try {
        const res = await fetch(file, { method: 'HEAD' });
        if (!res.ok) throw new Error(`Missing file: ${file}`);
      } catch (err) {
        blockWebsite(err.message);
        return;
      }
    }

    window.__CORE_LOADED__ = true;
    console.log("All required files are present. System integrity passed.");
  }

  function blockWebsite(message) {
    console.error("Website Halted", message);
    throw new Error(message);
  }

  window.addEventListener("DOMContentLoaded", checkCoreIntegrity);
})();