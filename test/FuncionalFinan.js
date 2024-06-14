const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs');

(async () => {
  const screen = { width: 1024, height: 720 };
  const chromeOptions = new Options();
  chromeOptions.addArguments('--headless');
  chromeOptions.addArguments('--no-sandbox');
  chromeOptions.addArguments('--disable-gpu');
  chromeOptions.addArguments('--ignore-certificate-errors');
  chromeOptions.addArguments('--disable-dev-shm-usage');
  chromeOptions.windowSize(screen);

  const builder = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions);

  let driver = await builder.build();
  try{
    await driver.get('https://stealth-faithful-geese.glitch.me/finan');

    const selectElement = await driver.wait(until.elementLocated(By.id('typeImovel')), 10000);

    const select = new Select(selectElement);

    await select.selectByValue('Casa');

    const screenshotDir = path.join(__dirname, '../fotos/finan');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });

    }

    await driver.takeScreenshot().then((image, err) => {
        fs.writeFileSync(path.join(screenshotDir, 'inicio-finan.png'), image, 'base64');
    });

    await driver.findElement(By.id('valueImovel')).sendKeys('1000000');
    await driver.findElement(By.id('monthlyIncome')).sendKeys('2000');
    await driver.findElement(By.id('propertyValue')).sendKeys('30000');
    await driver.findElement(By.id('term')).sendKeys('16');
    
    await driver.takeScreenshot().then((image, err) => {
        fs.writeFileSync(path.join(screenshotDir, 'valorDigitado-finan.png'), image, 'base64');
    });
    const calculateButton = await driver.findElement(By.css('.calculate'));
    await calculateButton.click();

    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'fim-finan.png'), image, 'base64');
    });

    const prestacao = await driver.findElement(By.id('resultado_final')).getText();
    console.log('Prestacao Final:', prestacao);

    if (prestacao.includes('R$')) {
      console.log('Passou: Valores calculados são visíveis e formatados corretamente');
    } else {
      console.log('Falhou: Valores calculados não são visíveis ou não estão formatados corretamente');
    }
  } catch (error) {
    console.error('Teste funcional falhou:', error);
  } finally {
    await driver.quit();
  }
  }
)