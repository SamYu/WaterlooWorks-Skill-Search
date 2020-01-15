import puppeteer from 'puppeteer';
import { getWorkTerm, objectPromise } from '../utils/utils';
import parseSkillsList from '../utils/parseSkillsList';

const url = 'https://waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings.htm';

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

async function scrapeExpandedPage(page) {
    const TABLE_SEL = '#postingDiv > div:nth-child(1) > div.panel-body > table > tbody';
    await page.waitForSelector(TABLE_SEL);
    const tableRows = await page.evaluate((sel) => {
        const elem = document.querySelector(sel);
        return elem ? elem.children : {};
    }, TABLE_SEL);
    const tableRowsCount = Object.keys(tableRows).length;
    const pageInfo = {};
    for (let i = 0; i < tableRowsCount; i++) {
        const ROW_KEY_SEL = TABLE_SEL + ' > tr:nth-child(INDEX) > td:nth-child(1)'.replace('INDEX', i);
        const ROW_VAL_SEL = TABLE_SEL + ' > tr:nth-child(INDEX) > td:nth-child(2)'.replace('INDEX', i);
        const rowKey = await page.evaluate((sel) => {
            const rowKeyElem = document.querySelector(sel);
            return rowKeyElem 
                ? rowKeyElem.innerHTML.replace(/<[^>]+>/g, '')
                    .replace(/\n/g, '').replace(/\t/g, '')
                : null;
        }, ROW_KEY_SEL);
        const rowVal = page.evaluate((sel) => {
            const rowValElem = document.querySelector(sel);
            return rowValElem
                ? rowValElem.innerHTML.replace(/<[^>]+>/g, '')
                    .replace(/\n/g, '').replace(/\t/g, '')
                : null;
        }, ROW_VAL_SEL);

        // eslint-disable-next-line default-case
        switch (rowKey) {
        case 'Region:':
            pageInfo.region = rowVal;
            break;
        case 'Job Summary:':
            pageInfo.summary = rowVal;
            break;
        case 'Job Responsibilities:':
            pageInfo.responsibilities = rowVal;
            break;
        case 'Required Skills:':
            pageInfo.skills = rowVal;
            break;
        case 'Work Term:':
            pageInfo.workTerm = rowVal;
            break;
        }
    }
    return objectPromise(pageInfo);
}

export default async function fetchLatestJobs(email, password) {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    // Auth using email and password
    await auth(page, email, password);

    // Navigate to jobs page
    await page.waitForNavigation();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const FOR_MY_PROGRAM_SEL = '#quickSearchCountsContainer > table > tbody > tr:nth-child(1) > td.full > a';
    await page.waitForSelector(FOR_MY_PROGRAM_SEL);
    await page.click(FOR_MY_PROGRAM_SEL);
    const jobCountOnPageSelector = '#totalOverAllPacks';
    await page.waitForSelector(jobCountOnPageSelector);

    // Get job count on page
    const jobCountOnPage = await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        return element ? element.innerHTML.split('>')[1].split('<')[0] : 0;
    }, jobCountOnPageSelector);

    // Get HTML selectors for each element
    const TABLE_SEL_PREFIX = '#postingsTable > tbody > tr:nth-child(INDEX) > ';
    const JOB_ID_SEL = `${TABLE_SEL_PREFIX}td:nth-child(3)`;
    const TITLE_SEL = `${TABLE_SEL_PREFIX}td:nth-child(4) > strong > span > a`;
    const TITLE_SEL_ALT = `${TABLE_SEL_PREFIX}td:nth-child(4) > span:nth-child(2) > a`;
    const TITLE_SEL_ALT2 = `${TABLE_SEL_PREFIX}td:nth-child(4) > span > a`;
    const COMPANY_SEL = `${TABLE_SEL_PREFIX}td:nth-child(5) > span`;
    const DROPDOWN_SEL = `${TABLE_SEL_PREFIX}td:nth-child(1) > div > a`;
    const EXPAND_JOB_SEL = `${TABLE_SEL_PREFIX}td:nth-child(1) > div > ul > li:nth-child(2) > a`;
    const jobs = [];

    // Iterate through the table of jobs
    for (let i = 1; i <= jobCountOnPage; i += 1) {
        // Get jobId, company, title
        const jobIdSelector = JOB_ID_SEL.replace('INDEX', i);
        const titleSelector = TITLE_SEL.replace('INDEX', i);
        const titleSelectorAlt = TITLE_SEL_ALT.replace('INDEX', i);
        const titleSelectorAlt2 = TITLE_SEL_ALT2.replace('INDEX', i);
        const companySelector = COMPANY_SEL.replace('INDEX', i);
        const jobObj = await page.evaluate((idSel, titleSel, titleSelAlt, titleSelAlt2, companySel) => {
            const jobId = document.querySelector(idSel)
                ? document.querySelector(idSel).innerHTML
                : null;
            let title = null;
            if (document.querySelector(titleSel)) {
                title = document.querySelector(titleSel).innerHTML.replace(/\n/g, '').replace(/\t/g, '');
            } else if (document.querySelector(titleSelAlt)) {
                title = document.querySelector(titleSelAlt).innerHTML.replace(/\n/g, '').replace(/\t/g, '');
            } else if (document.querySelector(titleSelAlt2)) {
                title = document.querySelector(titleSelAlt2).innerHTML.replace(/\n/g, '').replace(/\t/g, '');
            }
            const company = document.querySelector(companySel)
                ? document.querySelector(companySel).innerHTML
                : null;
            return {
                jobId,
                title,
                company,
            };
        }, jobIdSelector, titleSelector, titleSelectorAlt, titleSelectorAlt2, companySelector);

        // Expand job in new tab
        const dropdownSelector = DROPDOWN_SEL.replace('INDEX', i);
        const expandJobSelector = EXPAND_JOB_SEL.replace('INDEX', i);
        const pageTarget = page.target();
        await page.click(dropdownSelector);
        await page.waitForSelector(expandJobSelector);
        await page.click(expandJobSelector);
        const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
        const expPage = await newTarget.page();
        const expandedInfo = await scrapeExpandedPage(expPage);
        const skillsList = await parseSkillsList(expandedInfo.skills);
        jobs.push({
            ...jobObj,
            ...expandedInfo,
            lastUpdated: new Date(),
            skillsList,
        });
        await expPage.close();
    }
    return jobs;
}
