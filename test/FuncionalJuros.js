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
    await driver.get('https://stealth-faithful-geese.glitch.me/juros');

    await driver.wait(until.elementLocated(By.id('loanAmount')), 10000);

    const screenshotDir = path.join(__dirname, '../fotos/juros');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'inicio-juros.png'), image, 'base64');
    });

    await driver.findElement(By.id('loanAmount')).sendKeys('1000');
    await driver.findElement(By.id('loanTerm')).sendKeys('12');
    await driver.findElement(By.id('interestRate')).sendKeys('1');
    await driver.findElement(By.id('interestType')).sendKeys('monthly');

    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'valorDigitado-juros.png'), image, 'base64');
    });

    const calculateButton = await driver.findElement(By.css('button[onclick="calculateLoan()"]'));
    await calculateButton.click();

    await driver.wait(until.elementIsVisible(driver.findElement(By.id('results'))), 20000);

    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'fim-juros.png'), image, 'base64');
    });

    const timeToRepay = await driver.findElement(By.id('timeToRepay')).getText();
    const totalAmountPaid = await driver.findElement(By.id('totalAmountPaid')).getText();
    const totalInterestPaid = await driver.findElement(By.id('totalInterestPaid')).getText();

    console.log('Tempo para quitar o empréstimo:', timeToRepay);
    console.log('Total pago:', totalAmountPaid);
    console.log('Total de juros pagos:', totalInterestPaid);

    if (timeToRepay.includes('meses') && totalAmountPaid.includes('R$') && totalInterestPaid.includes('R$')) {
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