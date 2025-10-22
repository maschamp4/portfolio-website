# Vercel Deployment Guide

This guide will walk you through deploying your Three.js + Vite portfolio website to Vercel.

## Prerequisites

Before you begin, make sure you have:

- ✅ [GitHub Account](https://github.com/signup) (free)
- ✅ [Vercel Account](https://vercel.com/signup) (free - sign up with GitHub for easier integration)
- ✅ Git installed on your computer
- ✅ Your portfolio website code ready

## Step 1: Push Your Code to GitHub

### 1.1 Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `portfolio-website` (or your preferred name)
   - **Description**: "Portfolio website for Mascha - Artist & Creative Technologist"
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (you already have these)
5. Click **"Create repository"**

### 1.2 Connect Your Local Repository to GitHub

GitHub will show you commands after creating the repository. Use the commands for "push an existing repository from the command line":

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# Verify the remote was added
git remote -v
```

### 1.3 Stage and Commit Your Changes

```bash
# Stage all files
git add .

# Commit with a message
git commit -m "Initial commit: Portfolio website ready for deployment"
```

### 1.4 Push to GitHub

```bash
# Push to GitHub (first time)
git push -u origin master

# For subsequent pushes, you can simply use:
git push
```

**Note**: If your default branch is `main` instead of `master`, use:
```bash
git push -u origin main
```

You may be prompted to authenticate with GitHub. Follow the authentication prompts.

## Step 2: Deploy to Vercel

### 2.1 Sign Up / Log In to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** for seamless integration
4. Authorize Vercel to access your GitHub account

### 2.2 Import Your Project

1. From your Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find your `portfolio-website` repository
4. Click **"Import"** next to it

### 2.3 Configure Your Project

Vercel will auto-detect that you're using Vite. Verify the following settings:

- **Framework Preset**: Vite (auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

### 2.4 Environment Variables (Optional)

If your project uses environment variables:

1. Click **"Environment Variables"**
2. Add each variable with its name and value
3. Example: `VITE_API_KEY` = `your_api_key_here`

**Note**: This project doesn't require environment variables by default.

### 2.5 Deploy

1. Click **"Deploy"**
2. Vercel will:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Build your project (`npm run build`)
   - Deploy the `dist` folder

Wait for the deployment to complete (usually 1-3 minutes).

### 2.6 Access Your Live Site

Once deployment is complete:

1. You'll see a **"Success"** message with confetti! 🎉
2. Your site URL will be displayed (e.g., `https://portfolio-website-xxx.vercel.app`)
3. Click **"Visit"** to view your live portfolio

## Step 3: Custom Domain (Optional)

To use your own custom domain (e.g., `www.yourname.com`):

### 3.1 Add Your Domain in Vercel

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Enter your domain name
4. Click **"Add"**

### 3.2 Configure DNS Records

Vercel will provide DNS records you need to add. You have two options:

**Option A: Using Nameservers (Recommended)**
- Point your domain's nameservers to Vercel's nameservers
- This gives Vercel full control over DNS

**Option B: Using DNS Records**
Add the following records to your domain's DNS provider:

For apex domain (`yourname.com`):
```
Type: A
Name: @
Value: 76.76.21.21
```

For www subdomain (`www.yourname.com`):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3.3 Wait for DNS Propagation

DNS changes can take 24-48 hours to propagate globally, but often happen within a few hours.

### 3.4 Enable SSL (Automatic)

Vercel automatically provisions SSL certificates for your custom domain. Once DNS propagates, your site will be accessible via HTTPS.

## Automatic Deployments

Great news! Vercel automatically deploys your site whenever you push changes to GitHub:

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push
   ```
3. Vercel automatically detects the changes and deploys a new version
4. Check your deployment status on the Vercel dashboard

### Preview Deployments

- Every push to a non-main branch creates a **Preview Deployment**
- This lets you test changes before merging to main
- Perfect for reviewing changes before going live

## Managing Your Deployment

### Viewing Deployment Logs

1. Go to your project in Vercel
2. Click on any deployment
3. View **"Build Logs"** to see the build process
4. View **"Function Logs"** if using serverless functions

### Rolling Back

If something goes wrong:

1. Go to **"Deployments"** in your Vercel project
2. Find a previous successful deployment
3. Click the **"..."** menu → **"Promote to Production"**
4. Your site instantly rolls back to that version

### Environment Variables Management

To update environment variables:

1. Go to **"Settings"** → **"Environment Variables"**
2. Edit or add new variables
3. Redeploy your site to apply changes

## Troubleshooting

### Build Fails with "Command not found"

**Problem**: Vercel can't find `npm` or `node`

**Solution**: 
- Ensure [`package.json`](package.json) exists in your repository root
- Verify your `build` script is correct in [`package.json`](package.json)

### 404 Errors on Page Refresh

**Problem**: Single-page application routes return 404 when accessed directly

**Solution**: 
- The [`vercel.json`](vercel.json) file handles this with rewrites
- Ensure [`vercel.json`](vercel.json) is in your repository root

### Assets Not Loading

**Problem**: Images, videos, or fonts return 404 errors

**Solution**:
- Verify assets are in the [`public/`](public/) folder
- Check file paths in your code (should be `/images/file.jpg`, not `./public/images/file.jpg`)
- Ensure [`public/`](public/) folder is committed to Git

### Build Takes Too Long or Times Out

**Problem**: Build exceeds Vercel's timeout limit

**Solution**:
- Check for circular dependencies
- Reduce bundle size
- Optimize images before committing
- Remove unused dependencies

### Fonts Not Rendering

**Problem**: Custom fonts show fallback fonts instead

**Solution**:
- Verify font files are in [`public/fonts/`](public/fonts/)
- Check [`@font-face`](src/styles/variables.css:1) declarations in CSS
- Ensure font paths are correct (e.g., `/fonts/font-name.woff2`)
- Check browser console for 404 errors

### "This site can't be reached" Error

**Problem**: Custom domain doesn't resolve

**Solution**:
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correctly configured
- Use [DNS Checker](https://dnschecker.org) to verify propagation
- Check if your domain registrar has DNS changes pending

### Three.js Errors in Production

**Problem**: 3D scene doesn't render or shows errors

**Solution**:
- Check browser console for specific errors
- Verify [`three`](package.json:14) is in `dependencies`, not `devDependencies`
- Test locally with `npm run build` && `npm run preview`
- Ensure WebGL is supported in target browsers

### Large File Size Warnings

**Problem**: Vercel warns about large bundle sizes

**Solution**:
- Compress images using tools like [TinyPNG](https://tinypng.com)
- Consider using video hosting (YouTube, Vimeo) instead of local files
- Use dynamic imports for Three.js components
- Enable code splitting in Vite

## Performance Optimization

### Enable Compression

Vercel automatically enables gzip/brotli compression. No action needed!

### Optimize Images

Before deployment:
```bash
# Use image optimization tools
# Or use Vercel's Image Optimization API
```

### Caching Strategy

The [`vercel.json`](vercel.json) file configures caching:
- Static assets (JS, CSS, fonts): Cached for 1 year
- HTML files: No caching for instant updates

### Analytics

Enable Vercel Analytics:

1. Go to your project dashboard
2. Click **"Analytics"** tab
3. Click **"Enable Analytics"**
4. View real-time performance metrics

## Support Resources

- 📖 [Vercel Documentation](https://vercel.com/docs)
- 🎓 [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- 💬 [Vercel Community](https://github.com/vercel/vercel/discussions)
- 🐛 [Report Issues](https://github.com/vercel/vercel/issues)

## Quick Reference Commands

```bash
# Check Git status
git status

# Stage all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Build locally to test
npm run build

# Preview production build
npm run preview
```

## Next Steps After Deployment

1. ✅ Share your portfolio URL with friends and colleagues
2. ✅ Add your portfolio URL to your resume/CV
3. ✅ Update your social media profiles with the link
4. ✅ Set up [Vercel Analytics](https://vercel.com/analytics) to track visitors
5. ✅ Consider setting up a custom domain for a professional touch
6. ✅ Enable [Vercel Speed Insights](https://vercel.com/docs/speed-insights) to monitor performance

---

## Summary

Your portfolio is now live on Vercel! 🎉

- 🚀 Automatic deployments on every Git push
- 🔒 Free SSL certificate (HTTPS)
- 🌍 Global CDN for fast loading worldwide
- 📊 Built-in analytics
- ♾️ Unlimited bandwidth on Free plan

Happy deploying! If you encounter any issues, refer to the Troubleshooting section above.