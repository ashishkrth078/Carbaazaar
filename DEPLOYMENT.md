# Deployment Guide

## Railway.app Deployment (Recommended)

### Step 1: Prepare Your GitHub Repository
Ensure you've pushed all code to GitHub (already done):
```bash
git push origin main
```

### Step 2: Connect to Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your Carbaazaar repository
5. Railway will auto-detect the Dockerfile and build

### Step 3: Configure MongoDB

Railway needs a MongoDB database. You have two options:

**Option A: Use Railway's MongoDB Plugin (Easiest)**
1. In your Railway project, click "Add"
2. Select "MongoDB"
3. Railway will automatically inject `MONGODB_URI` environment variable

**Option B: Use MongoDB Atlas (Cloud)**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/carbaazaar?retryWrites=true`)
4. In Railway, add environment variable: `MONGODB_URI=<your-connection-string>`

### Step 4: Set Environment Variables

In Railway project settings, ensure these variables are set:
- `PORT`: 3000 (usually auto-set)
- `MONGODB_URI`: (auto-set if using Railway MongoDB, or manually set if using Atlas)
- `NODE_ENV`: production

### Step 5: Deploy

1. Railway will automatically build and deploy when you push to GitHub
2. Once deployment is complete, Railway will show your live URL (e.g., `carbaazaar.up.railway.app`)
3. Visit your URL to access the application

### Troubleshooting

**Build Failure:**
- Check Railway's build logs for errors
- Ensure Dockerfile is in the root directory
- Verify package.json has all dependencies

**Application Crashes:**
- Check deployment logs in Railway dashboard
- Ensure `MONGODB_URI` is correctly set
- Verify MongoDB is accessible

**Connection Timeout:**
- If using MongoDB Atlas, ensure Railway's IP is whitelisted (or allow all IPs: 0.0.0.0/0)
- Check database credentials

### Custom Domain Setup

1. In Railway project settings, go to "Domains"
2. Add your custom domain (e.g., carbaazaar.yourdomain.com)
3. Update your domain's DNS settings with provided CNAME record
4. Railway will auto-generate SSL certificate

---

## Local Testing Before Deployment

Test locally before pushing:

```bash
# Start MongoDB
docker-compose up -d

# Install dependencies
npm install

# Start the app
npm start

# Access at http://localhost:3000
```

---

## Alternative Deployment Platforms

### Render.com
Similar process to Railway, supports Docker and native Node.js deployments.

### Heroku (Paid)
Old favorite, now mostly paid but supports Dockerfile deployment.

---

## Monitoring & Logs

In Railway dashboard:
- View real-time logs
- Monitor resource usage
- Check deployment history
- Configure auto-deploy from GitHub