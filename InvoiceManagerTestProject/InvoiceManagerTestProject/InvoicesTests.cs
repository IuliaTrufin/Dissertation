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
    public class InvoicesTests
    {
        [Fact]
        public void GeneralValidations()
        {
            IWebDriver driver = new ChromeDriver();
            driver.Manage().Window.Maximize();
            driver.Navigate().GoToUrl("http://localhost:3000/invoices");
            Thread.Sleep(3000);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/h1")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div[2]/div[1]/button")) != null);
            driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div[2]/div[1]/button")).Click();
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div[2]/div[2]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div[2]/div[3]/a/button")) != null);
            driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div[2]/div[3]/a/button")).Click();
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div[2]/div[5]/div/div[2]")) != null);
            driver.Quit();
        }
    }
}
