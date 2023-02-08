import mixpanel from "mixpanel-browser"

export const track = (name: string, data: any) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
  } else {
    // production code
    mixpanel.track(name, data)
  }
}
