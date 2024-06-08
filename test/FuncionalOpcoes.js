const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

(async () => {
  const screen = { width: 1024, height: 720 };
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments('--headless', '--no-sandbox');
  chromeOptions.windowSize(screen);

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

  try {
    await driver.get('https://stealth-faithful-geese.glitch.me/option');

    //await driver.get('http://localhost:3000/option');
    
    await driver.wait(until.elementLocated(By.name('stockPrice')), 10000);
    await driver.findElement(By.name('stockPrice')).sendKeys(100, Key.RETURN);
    await driver.findElement(By.name('strikePrice')).sendKeys(100, Key.RETURN);
    await driver.findElement(By.name('timeToMaturity')).sendKeys(1, Key.RETURN);
    await driver.findElement(By.name('volatility')).sendKeys(0.2, Key.RETURN);
    await driver.findElement(By.name('riskFreeRate')).sendKeys(0.05, Key.RETURN);
    await driver.findElement(By.name('optionType')).sendKeys('call', Key.RETURN);
    await driver.findElement(By.name('exerciseType')).sendKeys('european', Key.RETURN);
    
    const calculateButton = await driver.findElement(By.css('button[type="submit"]'));
    await calculateButton.click();
    
    await driver.sleep(2000);

    await driver.takeScreenshot().then((image, err) => {
      fs.writeFile('./fotos/opcoesFuncional/option_test_result.png', image, 'base64', (err) => {
        if (err) console.error('Error saving screenshot:', err);
        else console.log('Screenshot saved.');
      });
    });
    
    const resultText = await driver.findElement(By.xpath('//p[contains(text(), "Option Price:")]')).getText();
    console.log('Result:', resultText);

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await driver.quit();
  }
})();
