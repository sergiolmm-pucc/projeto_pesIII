const timeout = 4000;// process.env.SLOWMO ? 6000 : 4000;
const fs = require('fs');

// Go to the specified path and wait for the domcontent to load before running the tests
beforeAll(async () => {
    console.log("Current Directory Path:", __dirname); 
  
    // Finding the canonical path 
    // one directory up 
    path1 = __dirname + "//.."; 
    console.log("Current Directory Path:", path1); 
    resolvedPath = fs.realpathSync(path1); 
    console.log("One directory up resolved path is: ", 
                 resolvedPath); 
    console.log("One directory up resolved path is: ", 
                 resolvedPath+'/public/html');
  path = fs.realpathSync(resolvedPath+'/public/html');
  ff='www.google.com';
  await page.goto(ff, {waitUntil: 'domcontentloaded'});
  //await page.goto('file://' + path+'/base.html', {waitUntil: 'domcontentloaded'});
});

describe('Title of the page', () => {
  test('Title of the page', async () => {
    // Gets page title
    const title = await page.title();
    // Compares it with the intended behaviour
    expect(title).toBe('Exemplo de pagina');

  }, timeout);
});