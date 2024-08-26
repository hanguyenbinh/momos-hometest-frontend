import { Goods } from "./goods";

export type OrderItems = {
  goods: Goods;
  goodsId: number;
  orderId: number;
  quantity: number;
  price: number;
};
