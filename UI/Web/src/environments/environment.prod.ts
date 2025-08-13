import { getBaseUrl } from "src/app/base-url.provider";
const IP = 'localhost';

export const environment = {
  production: true,
  apiUrl: 'http://' + IP + ':5000/api/',
  hubUrl: 'http://'+ IP + ':5000/hubs/',
  buyLink: 'https://buy.stripe.com/00gcOQanFajG0hi5ko?prefilled_promo_code=FREETRIAL',
  manageLink: 'https://billing.stripe.com/p/login/28oaFRa3HdHWb5ecMM'
};
