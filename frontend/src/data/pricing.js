// Single source for every price on the site. Set a value (e.g. "From $1,200") to publish it.
export const PRICES = {
  perProject: null,
  monthlyPerClient: null,
  dedicatedTeam: null,
  pilotProject: null,
};

export const ON_REQUEST = "Partner rate card on request";

export const priceFor = (key) => PRICES[key] || ON_REQUEST;
