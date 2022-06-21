using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Threading;
using Xunit;

namespace InvoiceManagerTestProject
{
    public class SignTests
    {
        [Fact]
        public void GeneralValidations()
        {
            IWebDriver driver = new ChromeDriver();
            driver.Manage().Window.Maximize();
            driver.Navigate().GoToUrl("http://localhost:3000/signin");
            Thread.Sleep(3000);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[1]/img")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[2]/a")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[3]/a")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div/h1")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"username\"]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"password\"]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div/form/button")) != null);
            driver.FindElement(By.XPath("//*[@id=\"username\"]")).SendKeys("a");
            driver.FindElement(By.XPath("//*[@id=\"password\"]")).SendKeys("a");
            Thread.Sleep(2000);
            driver.FindElement(By.XPath("//*[@id=\"root\"]/main/div/form/button")).Click();
            Thread.Sleep(4000);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[1]/img")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[2]/a")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[3]/a")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[4]/a")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[5]/a")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[6]/a")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[7]/a")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[8]/a")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[9]/a")) != null);
            driver.FindElement(By.XPath("//*[@id=\"root\"]/div/div[9]/a")).Click();
            driver.Quit();
        }
    }
}
