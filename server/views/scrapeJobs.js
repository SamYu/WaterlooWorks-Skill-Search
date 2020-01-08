const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const secrets = require('../../secrets');

const url = 'https://waterlooworks.uwaterloo.ca/myAccount/hire-waterloo/other-jobs/jobs-postings.htm';

async function auth(page, email, password) {
    await page.goto(url);
    const loginBtn = 'body > div.container-fluid > div > div > div.box.boxContent > div > div > div > a';
    await page.click(loginBtn);
    const studentsLoginBtn = 'body > div.container-fluid > div > div > div:nth-child(6) > div > div > a:nth-child(1)';
    await page.click(studentsLoginBtn);
    const emailField = '#userNameInput';
    await page.waitForNavigation();
    await page.click(emailField);
    await page.keyboard.type(email);
    const nextBtn = '#nextButton';
    await page.click(nextBtn);
    const passwordField = '#passwordInput';
    await page.click(passwordField);
    await page.keyboard.type(password);
    const signInBtn = '#submitButton';
    await page.click(signInBtn);
}

async function run() {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await auth(page, secrets.email, secrets.password);
    await page.waitForNavigation();
    await page.goto(url);
    await page.waitFor(1000);
    const TEMP_CLICK_LINK = '#quickSearchCountsContainer > table > tbody > tr:nth-child(5) > td.full > a';
    await page.click(TEMP_CLICK_LINK);
    await page.waitFor(1000);
    const jobCountOnPageSelector = '#totalOverAllPacks';
    const jobCountOnPage = await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        return element ? element.innerHTML.split('>')[1].split('<')[0] : 0;
    }, jobCountOnPageSelector);
    const TABLE_SEL_PREFIX = '#postingsTable > tbody > tr:nth-child(INDEX) > ';
    const JOB_ID_SEL = `${TABLE_SEL_PREFIX}td:nth-child(3)`;
    const TITLE_SEL = `${TABLE_SEL_PREFIX}td:nth-child(4) > strong > span > a`;
    const COMPANY_SEL = `${TABLE_SEL_PREFIX}td:nth-child(5) > span`;
    const jobs = [];
    for (let i = 1; i <= jobCountOnPage; i += 1) {
        const jobIdSelector = JOB_ID_SEL.replace('INDEX', i);
        const titleSelector = TITLE_SEL.replace('INDEX', i);
        const companySelector = COMPANY_SEL.replace('INDEX', i);
        const jobObj = page.evaluate((idSel, titleSel, companySel) => {
            const jobId = document.querySelector(idSel).innerHTML;
            const title = document.querySelector(titleSel).innerHTML.replace(/\n/g, '').replace(/\t/g, '');
            const company = document.querySelector(companySel).innerHTML;
            return {
                jobId,
                title,
                company,
            };
        }, jobIdSelector, titleSelector, companySelector);
        jobs.push(jobObj);
    }
    const results = await Promise.all(jobs);
    console.log(results);
}

run();
