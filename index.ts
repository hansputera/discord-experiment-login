import db from "./db.json";
import { launch } from "puppeteer";

let clid = "";
let clis = "";

export default class DiscordLogin {
  readonly baseURL = db.baseURL;
  readonly dev = db.devURL;

  constructor(readonly email: string, readonly password: string) {}

  async createApp(userApp: string) {
      const browser = await launch();
      const page = await browser.newPage();

      await page.goto(this.baseURL + this.dev);
      await page.type('input#email', this.email);
      await page.type('input#password', this.password);
     
      await page.click('button');
      await page.waitForNavigation();

      await page.click(`button."button-38aScr filledBrand-pyfKOu filledDefault-eAvIdC buttonHeightMedium-2WWoR- unpaired-31HHvP"`);
      await page.type("input#name", userApp);
      await page.click(`button."button-38aScr filledBrand-pyfKOu filledDefault-eAvIdC buttonHeightTall-35JAaW unpaired-31HHvP createButton-XLvetg"`);
      await page.waitForNavigation();

      await page.evaluate(() => {
       const clientid = document.queryCommandValue(".code-j7WzRK");
       clid += clientid;
      });

      await page.click(`button."button-1SNZnm"`);
      await page.evaluate(() => {
        clis += document.queryCommandValue(".content-4W9wwL > .code-j7WzRK");
      });

      process.stdout.write(`Application has been created\nClient id : ${clid}\nSecret : ${clis}`);
      
    //   Token Scraping
    await page.click(`a."navLink-1Neui4 navLinkMedium-4MZo72 activeLink-22b0_I"`);
    await page.waitForNavigation();
    await page.click(`button."button-38aScr filledBrand-pyfKOu filledDefault-eAvIdC buttonHeightTall-35JAaW unpaired-31HHvP addButton-D89jYy"`);
    await page.click(`button."button-38aScr filledBrand-pyfKOu filledDefault-eAvIdC buttonHeightTall-35JAaW unpaired-31HHvP modalFooterButton-XdS1ri"`);
    await page.waitFor(20000); // 20 second

    await page.click(`button."button-1SNZnm"`);
    await page.click(`button."button-38aScr filledBrand-pyfKOu filledDefault-eAvIdC buttonHeightShort-2qJiZC unpaired-31HHvP copyAction-2zqZay copyButton-3g5JtD"`);
  };
}