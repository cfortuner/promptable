import { RunStepArgs } from "@steps/Step";
import { ToolStep } from "@steps/ToolStep";
import axios from "axios";

/**
 * Usage
 *
 * const yelpStep = new YelpStep(apiKey);
 * const chain = new SequentialChain("Yelp Search");
 *
 * await chain.run({
 *  steps: [yelpStep],
 *  inputs: {
 *      term: "sushi",
 *      location: "San Francisco, CA",
 *  },
 *  });
 */
export class YelpStep extends ToolStep<any, any> {
  apiKey: string;
  constructor(apiKey: string) {
    super("Yelp");
    this.apiKey = apiKey;
  }

  _serialize(): object {
    return {};
  }

  async _run({ inputs }: RunStepArgs<any, any>) {
    // make the API call
    const { data } = await axios.get(
      `https://api.yelp.com/v3/businesses/search?term=${inputs.term}&location=${inputs.location}`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );

    // return the relevant data
    return {
      businesses: data.businesses,
    };
  }
}
