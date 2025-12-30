# Quick Start: Deploy to Cloudflare Pages

## Option 1: GitHub + Cloudflare Dashboard (Easiest - 5 minutes)

### 1. Push to GitHub

```bash
cd /Users/breezyyy/Downloads/GDK
git init
git add .
git commit -m "Initial commit - Gospel Keys Demystified"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Select your GitHub repository
4. Configure:
   - **Build command**: `npm run build`
   - **Build output directory**: `build`
   - **Environment variables**: Add Firebase config (see below)
5. Click **Save and Deploy**

### Firebase Environment Variables

Add these in Cloudflare Pages settings:

```
REACT_APP_FIREBASE_API_KEY = AIzaSyDFbYswYsz2qVru_Bk_DKcV2eXdwlTcxjI
REACT_APP_FIREBASE_AUTH_DOMAIN = wgdk-3b21a.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID = wgdk-3b21a
REACT_APP_FIREBASE_STORAGE_BUCKET = wgdk-3b21a.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 149217261386
REACT_APP_FIREBASE_APP_ID = 1:149217261386:web:67f9090937182674edf3b3
REACT_APP_FIREBASE_MEASUREMENT_ID = G-PLH44WBXT2
```

### 3. Update Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project → **Authentication** → **Settings** → **Authorized domains**
3. Add your Cloudflare Pages URL (e.g., `gospel-keys-demystified.pages.dev`)

Done! Your site is live!

---

## Option 2: Direct Deploy with Wrangler CLI

### 1. Install Wrangler

```bash
npm install -g wrangler
```

### 2. Login

```bash
wrangler login
```

### 3. Build & Deploy

```bash
npm run build
wrangler pages deploy build --project-name=gospel-keys-demystified
```

---

## Files Created for Deployment

✅ `public/_redirects` - React Router support
✅ `.node-version` - Node.js version specification
✅ `wrangler.toml` - Cloudflare configuration
✅ `DEPLOYMENT.md` - Full deployment guide
✅ `.env.example` - Environment variable template
✅ Updated `src/config/firebase.js` - Environment variable support

---

## Next Steps After Deployment

1. ✅ Test all pages and authentication
2. ✅ Verify Firebase authentication works
3. ✅ Check course enrollment functionality
4. ✅ Test shopping cart and checkout
5. ✅ Set up custom domain (optional)

---

## Automatic Deployments

Every time you push to your main branch, Cloudflare automatically rebuilds and deploys:

```bash
git add .
git commit -m "Update content"
git push origin main
```

---

## Troubleshooting

**Build fails?** Check Cloudflare build logs
**404 errors?** Verify `_redirects` file exists in `public/`
**Auth not working?** Add domain to Firebase authorized domains

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed troubleshooting.
