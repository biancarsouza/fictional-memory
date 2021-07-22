const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/alvoradasupermercados');
  
  const imgList = await page.evaluate(() => {
  
    const nodeList = document.querySelectorAll('article img');
    const imgArray = [...nodeList];
    const imgList = imgArray.map( ({src}) => ({
      src
    }));
    
    return imgList;

  });

  const altList = await page.evaluate(() => {
  
    const nodeList = document.querySelectorAll('article img');
    const altArray = [...nodeList];
    const altList = altArray.map( ({alt}) => ({
      alt
    }));

    return altList;

  });

  
  
  fs.writeFile('instagramimg.json', JSON.stringify(imgList, null, 2), err => {
      if(err) throw new Error('Something went wrong.')

      console.log('Well done!');
  });

  fs.writeFile('instagramalt.json', JSON.stringify(altList, null, 2), err => {
    if(err) throw new Error('Something went wrong.')

    console.log('Well done!');
  });

 await browser.close();

}
)();