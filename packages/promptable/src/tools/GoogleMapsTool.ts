import axios from "axios";
import z, { any } from "zod";
import { ToolStep } from "@steps/ToolStep";
import { RunStepArgs } from "@steps/Step";

// const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "missing";

export class GoogleMapsApiTool extends ToolStep<any, any> {
  constructor() {
    super("Google Maps API Tool");
    this.inputs(
      z.object({
        address: z.string(),
      })
    );

    this.outputs(
      z.object({
        lat: z.number(),
        lng: z.number(),
      })
    );
  }

  _serialize(): object {
    return {};
  }

  async _run(args: RunStepArgs<any, any>) {
    const { address } = args.inputs;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=`;

    const { data } = await axios.get(url);
    const location = data.results[0].geometry.location;

    return {
      lat: location.lat,
      lng: location.lng,
    };
  }
}
