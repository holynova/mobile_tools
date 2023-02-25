export interface Params {
  totalPrice: number;
  tradeCenterVerifiedPrice: number; // 交易中心核验价格
  isOverFiveYears: boolean; // 满五
  isSellersOnlyHouse: boolean; //唯一
  isBuyerOnlyHouse: boolean; // 买家首贷
  agencyFeeRate: number; // 中介费率
  area: number; //面积(平方米)
  isNormalHouse: boolean; //普宅
  isPublicHouseFirstTrade: boolean; //  售后公房
  buyPrice: number; //购入价格
  downPaymentPercentage: number; // 首付比例
}

export interface PriceNode {
  name: string;
  base?: number;
  rate?: number;
  result: number;
  children?: PriceNode[];
}
export interface Result {
  base: number;
  rate: number;
  result: number;
}

export class HouseCalculator {
  totalPrice: number;
  tradeCenterVerifiedPrice: number;
  isOverFiveYears: boolean;
  isSellersOnlyHouse: boolean;
  isBuyerOnlyHouse: boolean;
  agencyFeeRate: number;
  area: number;
  isNormalHouse: boolean;
  isPublicHouseFirstTrade: boolean;
  buyPrice: number;
  downPaymentPercentage: number; // 首付比例

  constructor() {
    this.totalPrice = 0;
    this.tradeCenterVerifiedPrice = 0;
    this.isOverFiveYears = false;
    this.isSellersOnlyHouse = false;
    this.isBuyerOnlyHouse = false;
    this.agencyFeeRate = 0;
    this.area = 0;
    this.isNormalHouse = false;
    this.isPublicHouseFirstTrade = false;
    this.buyPrice = 0;
    this.downPaymentPercentage = 0.35;
  }

  update(input: Params) {
    this.totalPrice = input.totalPrice;
    this.tradeCenterVerifiedPrice = input.tradeCenterVerifiedPrice;
    this.isOverFiveYears = input.isOverFiveYears;
    this.isSellersOnlyHouse = input.isSellersOnlyHouse;
    this.isBuyerOnlyHouse = input.isBuyerOnlyHouse;
    this.agencyFeeRate = input.agencyFeeRate;
    this.area = input.area;
    this.isNormalHouse = input.isNormalHouse;
    this.isPublicHouseFirstTrade = input.isPublicHouseFirstTrade;
    this.buyPrice = input.buyPrice;
    this.downPaymentPercentage = input.downPaymentPercentage;
  }

  getAgencyFee(): Result {
    const base = this.totalPrice;
    const rate = this.agencyFeeRate ?? 2;
    return { base, rate, result: (base * rate) / 100 };
  }
  // 契税
  getDeedTax(): Result {
    let base = this.tradeCenterVerifiedPrice;
    let rate = 0;
    if (this.isBuyerOnlyHouse) {
      rate = this.area <= 90 ? 1 : 1.5;
    } else {
      rate = 3;
    }
    return { base, rate, result: (base * rate) / 100 };
  }
  // 增值税
  getValueAddedTax(): Result {
    let base = this.tradeCenterVerifiedPrice;
    let rate = 0;
    if (this.isPublicHouseFirstTrade) {
      rate = 0;
    } else if (this.isNormalHouse) {
      rate = this.isOverFiveYears ? 0 : 5.4;
      base = this.tradeCenterVerifiedPrice / 1.05;
    } else {
      // 非普宅
      rate = 5.4;
      base = this.isOverFiveYears
        ? (this.tradeCenterVerifiedPrice - this.buyPrice) / 1.05
        : this.tradeCenterVerifiedPrice / 1.05;
    }
    return { base, rate, result: (base * rate) / 100 };
  }
  // 个人所得税
  getPersonalInputTax(): Result {
    const key = `${this.isPublicHouseFirstTrade ? 1 : 0}${
      this.isNormalHouse ? 1 : 0
    }${this.isOverFiveYears ? 1 : 0}${this.isSellersOnlyHouse ? 1 : 0}`;
    const base = this.tradeCenterVerifiedPrice;
    const dict = {
      // 非普宅
      "0000": { base, rate: 2 },
      "0001": { base, rate: 2 },
      "0010": { base, rate: 2 },
      "0011": { base, rate: 0 },
      // 普宅
      "0100": { base, rate: 1 },
      "0101": { base, rate: 1 },
      "0110": { base, rate: 1 },
      "0111": { base, rate: 0 },
      // 售后公房
      "1000": { base, rate: 1 },
      "1001": { base, rate: 1 },
      "1010": { base, rate: 1 },
      "1011": { base, rate: 0 },
      "1100": { base, rate: 1 },
      "1101": { base, rate: 1 },
      "1110": { base, rate: 1 },
      "1111": { base, rate: 0 },
    };

    const rate = dict[key].rate;
    return { base, rate, result: (base * rate) / 100 };
  }
  // 首付
  getDownPayment(): Result {
    const base = this.tradeCenterVerifiedPrice;
    const rate = this.downPaymentPercentage;
    return { base, rate, result: (base * rate) / 100 };
  }
  //贷款总额
  getTotalLoan(): Result {
    const rate = 100 - this.downPaymentPercentage;
    const base = this.tradeCenterVerifiedPrice;
    return { base, rate, result: (base * rate) / 100 };
  }

  autoSum(input: PriceNode): PriceNode {
    const isValidArray = (v: any) => Array.isArray(v) && v.length > 0;
    const isLeafNode = (x: PriceNode) => !isValidArray(x?.children);

    const loop = (node: PriceNode): number => {
      if (isLeafNode(node)) {
        return node.result;
      }

      let sumOfChildren =
        node.children?.reduce((prev: number, cur: PriceNode): number => {
          return prev + loop(cur);
        }, 0) ?? 0;
      node.result = sumOfChildren;
      return sumOfChildren;
    };

    loop(input);
    return input;
  }

  go(input: Params) {
    this.update(input);
    // const valueAddedTax = this.getValueAddedTax();
    // const deedTax = this.getDeedTax();
    // const personalInputTax = this.getPersonalInputTax();
    // const agencyFee = this.getAgencyFee();

    const view1: PriceNode = {
      name: "总金额",
      result: 0,
      children: [
        {
          name: "房屋总价",
          result: 0,
          children: [
            { name: "首付", ...this.getDownPayment() },
            { name: "贷款总额", ...this.getTotalLoan() },
            {
              name: "评估差价",
              result: this.totalPrice - this.tradeCenterVerifiedPrice,
              base: 0,
              rate: 0,
            },
          ],
        },
        {
          name: "税费总额",
          result: 0,
          children: [
            {
              name: "增值税",
              ...this.getValueAddedTax(),
            },
            {
              name: "契税",
              ...this.getDeedTax(),
            },
            {
              name: "个人所得税",
              ...this.getPersonalInputTax(),
            },
            {
              name: "中介费",
              ...this.getAgencyFee(),
            },
          ],
        },
      ],

      // value: this.totalPrice +
    };
    this.autoSum(view1);

    return view1;
    // https://zhuanlan.zhihu.com/p/601694366 // this.update(input)
  }
}
