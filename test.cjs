const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('response', response => {
    console.log('PAGE RESPONSE:', response.status(), response.url());
  });

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 10000 });
    console.log("Navigation successful");
    const content = await page.content();
    console.log("Content length:", content.length);
    if (content.length < 1000) {
        console.log("Content:", content);
    }
  } catch (err) {
    console.error("Navigation failed:", err.message);
  }

  await browser.close();
})();
