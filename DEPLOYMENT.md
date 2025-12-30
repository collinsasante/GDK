# Deploying Gospel Keys Demystified to Cloudflare Pages

This guide will walk you through deploying your React application to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account (free tier is sufficient)
2. Git repository with your code pushed to GitHub, GitLab, or Bitbucket
3. Node.js 18+ installed locally

## Method 1: Deploy via Cloudflare Dashboard (Recommended for beginners)

### Step 1: Push Your Code to Git

If you haven't already, initialize a git repository and push to GitHub:

```bash
cd /Users/breezyyy/Downloads/GDK

# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Prepare Gospel Keys Demystified for Cloudflare deployment"

# Create a new repository on GitHub, then:
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on **"Workers & Pages"** in the left sidebar
3. Click **"Create application"**
4. Select the **"Pages"** tab
5. Click **"Connect to Git"**

### Step 3: Configure Your Project

1. **Select your repository** from GitHub/GitLab/Bitbucket
2. Click **"Begin setup"**
3. Configure build settings:
   - **Project name**: `gospel-keys-demystified` (or your preferred name)
   - **Production branch**: `main`
   - **Framework preset**: `Create React App`
   - **Build command**: `npm run build`
   - **Build output directory**: `build`
   - **Node version**: `18` (this is set in `.node-version` file)

### Step 4: Add Environment Variables (for Firebase)

1. In the build configuration page, scroll to **"Environment variables"**
2. Add the following variables (from your Firebase config):

```
REACT_APP_FIREBASE_API_KEY = AIzaSyDFbYswYsz2qVru_Bk_DKcV2eXdwlTcxjI
REACT_APP_FIREBASE_AUTH_DOMAIN = wgdk-3b21a.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID = wgdk-3b21a
REACT_APP_FIREBASE_STORAGE_BUCKET = wgdk-3b21a.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 149217261386
REACT_APP_FIREBASE_APP_ID = 1:149217261386:web:67f9090937182674edf3b3
REACT_APP_FIREBASE_MEASUREMENT_ID = G-PLH44WBXT2
```

**Note**: You'll need to update your `src/config/firebase.js` to use these environment variables instead of hardcoded values.

### Step 5: Deploy

1. Click **"Save and Deploy"**
2. Cloudflare will build and deploy your site
3. Once complete, you'll get a URL like: `gospel-keys-demystified.pages.dev`

## Method 2: Deploy via Wrangler CLI (Advanced)

### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

### Step 3: Build Your Project

```bash
npm run build
```

### Step 4: Deploy

```bash
wrangler pages deploy build --project-name=gospel-keys-demystified
```

## Important: Update Firebase Config for Production

After deployment, you should update your Firebase configuration to use environment variables:

### Update `src/config/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDFbYswYsz2qVru_Bk_DKcV2eXdwlTcxjI",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "wgdk-3b21a.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "wgdk-3b21a",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "wgdk-3b21a.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "149217261386",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:149217261386:web:67f9090937182674edf3b3",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-PLH44WBXT2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
```

## Configure Firebase Authentication

After deployment, update your Firebase console:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (`wgdk-3b21a`)
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Add your Cloudflare Pages domain:
   - `gospel-keys-demystified.pages.dev`
   - Any custom domain you configure

## Custom Domain (Optional)

To use a custom domain like `gospelkeysdemystified.com`:

1. In Cloudflare Pages, go to your project
2. Click **"Custom domains"**
3. Click **"Set up a custom domain"**
4. Enter your domain name
5. Follow the DNS configuration instructions
6. Update Firebase authorized domains with your custom domain

## Automatic Deployments

Cloudflare Pages automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update site content"
git push origin main
```

Your site will rebuild and redeploy automatically!

## Troubleshooting

### Build Fails

- Check the build logs in Cloudflare Pages dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version is set correctly

### Routes Don't Work (404 errors)

- Ensure `_redirects` file is in the `public` folder
- The file should contain: `/*    /index.html   200`

### Firebase Authentication Not Working

- Check that your Cloudflare Pages domain is added to Firebase authorized domains
- Verify environment variables are set correctly in Cloudflare Pages settings

### Images or Assets Not Loading

- Ensure all asset imports use relative paths
- Check that files are in the `public` folder or properly imported in components

## Performance Optimization

Cloudflare automatically provides:
- Global CDN distribution
- Automatic HTTPS
- DDoS protection
- Fast builds and deployments
- Unlimited bandwidth (on free tier)

## Monitoring

View deployment status and analytics:
1. Cloudflare Dashboard → Workers & Pages → Your Project
2. Check "Deployments" tab for build history
3. View "Analytics" for traffic metrics

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)
- [Firebase Documentation](https://firebase.google.com/docs)
