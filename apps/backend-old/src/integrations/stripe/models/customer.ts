import UserInfo from "../../../utils/userinfo";
import fail, { CODE } from "../../../utils/fail";
import stripe from "../config";

export default class Customer {
  static getId = async (user: Parse.User): Promise<string> => {
    return (await UserInfo.get(user)).get("stripe_cus_id");
  };

  static getUser = async (cusId: string) => {
    const info = await new Parse.Query("UserInfo")
      .equalTo("stripe_cus_id", cusId)
      .include("user")
      .first({ useMasterKey: true });
    return info.get("user") as Parse.User;
  };

  static create = async (user: Parse.User) => {
    if (!user?.id) {
      fail(
        "Internal: Tried to create Customer for undefined user",
        CODE.InternalError,
      );
    }
    const id = await this.getId(user);

    // if customer has been deleted, create a new
    if (id) {
      try{
        const customer = await stripe.customers.retrieve(
          id,
        );
        if (!customer.deleted) return id;
      }
      catch(e){
        // customer did not exist on stripe
      }
    }

    // create on stripe
    const stripeCustomer = await stripe.customers.create({
      email: user.getEmail(),
      metadata: {
        id: user.id,
      },
    });

    // save id
    await UserInfo.update(user, { stripe_cus_id: stripeCustomer.id });
    return stripeCustomer.id;
  };

  // static delete = async (user: Parse.User) => {
  //   const info = await new Parse.Query("Customer")
  //     .equalTo("user", user)
  //     .first({ useMasterKey: true });
  //   return await info?.destroy({ useMasterKey: true });
  // };
}
