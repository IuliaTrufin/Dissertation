using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Threading;
using Xunit;

namespace InvoiceManagerTestProject
{
    public class HomeTests
    {
        [Fact]
        public void GeneralValidations()
        {
            IWebDriver driver = new ChromeDriver();
            driver.Manage().Window.Maximize();
            driver.Navigate().GoToUrl("http://localhost:3000/");
            Thread.Sleep(3000);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/img")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/h1")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[1]/div")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[1]/div/div")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[1]/div/p")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[2]/div")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[2]/div/div")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[2]/div/p")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[3]/div")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[3]/div/div")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[3]/div/p")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[4]/div")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[4]/div/div")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[4]/div/p")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[5]/div")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[5]/div/div")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div[5]/div/p")) != null);
            driver.Quit();
        }
    }
}