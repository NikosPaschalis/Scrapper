const puppeteer = require('puppeteer');



(async () => {
    //{headless: false} in order to open the window
  
  // const page = await browser.newPage();
  // await page.goto('https://www.bookdepository.com/bestsellers');
  // //pausing window in order to not close fast
  //   //await browser.waitForTarget(() =>false);
  //   const result = await page.evaluate(() =>{
  //       let heading = document.querySelectorAll('.item-info');
  //       const headingList = [...heading];
  //       return headingList.map(h =>"Title: " + h.childNodes[1].innerText + " Author: "+ h.childNodes[3].innerText + " Price: " + h.childNodes[11].children[0].innerText);
        
  //   });
  //   console.log(result);

    const extractAmazonTitles = async (url) => {
      const amazon = await browser.newPage();
      await amazon.goto(url);
      const AmazonTitles = await amazon.evaluate(() =>
           Array.from(document.querySelectorAll('.zg-item-immersion .p13n-sc-truncated'))
           .map(b => b.innerText.trim(''))         
      );
      await amazon.close();
      if (AmazonTitles.length < 1) {
        // Terminate if no partners exist
        return AmazonTitles
      } else {
        // Go fetch the next page ?page=X+1
        const nextPageNumber = parseInt(url.match(/pg=(\d+)$/)[1], 10) + 1;
        const nextUrl = `https://www.amazon.com/best-sellers-books-Amazon/zgbs/books/ref=zg_bs_pg_2?_encoding=UTF8&pg=${nextPageNumber}`;
  
        return AmazonTitles.concat(await extractAmazonTitles(nextUrl))
      }
      return AmazonTitles;
    }
    const browser = await puppeteer.launch();
    const url = 'https://www.amazon.com/best-sellers-books-Amazon/zgbs/books/ref=zg_bs_pg_2?_encoding=UTF8&pg=1'; 
    const Amazonresult = await extractAmazonTitles(url);
    console.log(Amazonresult);
  await browser.close();
})();