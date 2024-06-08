const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');


const makeDirs = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

(async () => {
  
  const screen = {
    width: 1024,
    height: 720
  };

  const chromeOptions = new Options();
  chromeOptions.addArguments('--headless');
  chromeOptions.addArguments('--no-sandbox');
  chromeOptions.windowSize(screen);

  const builder = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions);

  
  let driver = await builder.build();

  try {
   
    await driver.get('https://stealth-faithful-geese.glitch.me/fgts');

    
    await driver.wait(until.elementLocated(By.id('salario')), 20000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('salario'))), 20000);
    await driver.wait(until.elementLocated(By.id('mes')), 20000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('mes'))), 20000);

    
    const screenshotDir = './fotos/fgtsfuncional';
    makeDirs(screenshotDir);

    
    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'inicio-example.png'), image, 'base64');
      console.log('Gravou Foto Inicial');
    });

    
    await driver.findElement(By.id('salario')).sendKeys(5000, Key.RETURN);
    await driver.findElement(By.id('mes')).sendKeys(12, Key.RETURN);

   
    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'valorDigitado-example.png'), image, 'base64');
      console.log('Gravou Foto com Valores Digitados');
    });

    
    const calculaButton = await driver.findElement(By.css('button[type="submit"]'));
    if (await calculaButton.isDisplayed()) {
      console.log('Passou: Botão de cálculo está visível');
    } else {
      console.log('Falhou: Botão de cálculo não está visível');
    }
    await calculaButton.click();

  
    await driver.wait(until.elementLocated(By.id('resultado')), 20000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('resultado'))), 20000);

  
    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'fim-example.png'), image, 'base64');
      console.log('Gravou Foto Final');
    });

    
    const resultado = await driver.findElement(By.id('resultado')).getText();
    if (resultado.includes('R$')) {
      console.log('Passou: Cálculo de FGTS exibido corretamente');
    } else {
      console.log('Falhou: Cálculo de FGTS não exibido corretamente');
    }
  } catch (error) {
    console.error('Teste funcional falhou:', error);
  } finally {
    await driver.quit();
  }
})();
