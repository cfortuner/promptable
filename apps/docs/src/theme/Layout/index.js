import React, { useEffect } from 'react';
import Layout from '@theme-original/Layout';
import mixpanel from 'mixpanel-browser';
import { useLocation } from '@docusaurus/router';
import { inject } from "@vercel/analytics"

import { Analytics } from '@vercel/analytics/react';
export default function LayoutWrapper(props) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
  } else {
    // production code
    mixpanel.init('0c100fcfe97943ac4ded12a1d1a8cc7f');
  }

  const location = useLocation()
  // useEffect(() => {
  //   if (location.pathname.includes('docs')) {
  //     const element = document.getElementsByClassName("navbar")
  //     for (let navItem of element) {
  //       navItem.style.background = "#111111"
  //       navItem.style.borderBottom = "solid 1px #272727"
  //     }
  //   }
  // }, [location])

  return (
    <>
      <Analytics />
      <Layout {...props} />
    </>
  );
}

