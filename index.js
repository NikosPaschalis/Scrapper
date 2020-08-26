const puppeteer = require('puppeteer');

(async () => {
    //{headless: false} in order to open the window
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.bookdepository.com/bestsellers');
  //pausing window in order to not close fast
    //await browser.waitForTarget(() =>false);
    const result = await page.evaluate(() =>{
        let heading = document.querySelectorAll('h3');
        const headingList = [...heading];
        return headingList.map(h => h.innerText);
    });
    console.log(result);

    const amazon = await browser.newPage();
    await amazon.goto('https://www.amazon.com/gp/bestsellers/2020/books');
      const Amazonresult = await amazon.evaluate(() =>{
          let heading = document.querySelectorAll('.p13n-sc-truncated');
          const headingList = [...heading];
          return headingList.map(h => h.innerText);
      });
      console.log(Amazonresult);
  await browser.close();
})();