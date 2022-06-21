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
    public class EditProduct
    {
        [Fact]
        public void GeneralValidations()
        {
            IWebDriver driver = new ChromeDriver();
            driver.Manage().Window.Maximize();
            driver.Navigate().GoToUrl("http://localhost:3000/product/1/edit");
            Thread.Sleep(3000);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/h1")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div/div[1]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div/div[2]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div/div[3]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div/div[4]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div/div[5]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div/div[6]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div/div[7]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div/div[8]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div/div[9]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/div/div[10]")) != null);
            Assert.True(driver.FindElement(By.XPath("//*[@id=\"root\"]/div[2]/main/div/label")) != null);
            driver.Quit();
        }
    }
}
