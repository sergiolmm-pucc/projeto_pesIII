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

  try {
    await driver.get('https://stealth-faithful-geese.glitch.me/renda');
    // await driver.get('http://localhost:3000/renda');
    
    await driver.wait(until.elementLocated(By.id('initial-investment')), 10000);

    const screenshotDir = path.join(__dirname, '../fotos/renda');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'inicio-renda.png'), image, 'base64');
    });

    await driver.findElement(By.id('initial-investment')).sendKeys('R$ 1000,00');
    await driver.findElement(By.id('duration')).sendKeys(12);
    await driver.findElement(By.id('monthly-investment')).sendKeys('R$ 100,00');
    await driver.findElement(By.id('profitability')).sendKeys('5,00');
    await driver.findElement(By.id('duration-unit')).sendKeys('Anos');
    await driver.findElement(By.id('profitability-period')).sendKeys('Anual');

    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'valorDigitado-renda.png'), image, 'base64');
    });

    const calculateButton = await driver.findElement(By.css('.calculate'));
    await calculateButton.click();

    await driver.wait(until.elementIsVisible(driver.findElement(By.id('modal'))), 20000);

    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'fim-renda.png'), image, 'base64');
    });

    const valorBruto = await driver.findElement(By.id('valorBruto')).getText();
    const impostos = await driver.findElement(By.id('impostos')).getText();
    const valorLiquido = await driver.findElement(By.id('valorLiquido')).getText();

    console.log('Valor Bruto:', valorBruto);
    console.log('Impostos:', impostos);
    console.log('Valor Líquido:', valorLiquido);

    if (valorBruto.includes('R$') && impostos.includes('R$') && valorLiquido.includes('R$')) {
      console.log('Passou: Valores calculados são visíveis e formatados corretamente');
    } else {
      console.log('Falhou: Valores calculados não são visíveis ou não estão formatados corretamente');
    }
  } catch (error) {
    console.error('Teste funcional falhou:', error);
  } finally {
    await driver.quit();
  }
})();
