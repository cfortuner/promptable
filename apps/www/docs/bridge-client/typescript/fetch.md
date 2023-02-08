---
sidebar_label: 'Fetch your Client SDK'
---

# Fetch your Client SDK

Refer to the [Bridge Studio documentation](../../bridge-studio.md) to learn how to deploy your Bridge API and retrieve your client SDK from Bridge Studio.

**To deploy your project on Bridge Studio:**
```bash title='terminal'
npx bridge-studio@latest
```

**To fetch the latest typescript client sdk:**
```bash title='terminal'
npx fetch-bridge-sdk@latest {username}{projectName}
```

If you do not have `axios` and `form-data` installed in your project, the command line will automatically install them for you.

The upcoming version of the command line will allow you to select your preferred HTTP client library, either axios or fetch, and the required packages will be automatically installed if they are not already present in your project.