# Auto Tweet Generator 🐦

Automated Node.js application that posts "hello world!" to Twitter every day at 11:00 AM IST.

## Features

- ✅ Automated daily tweets at 11:00 AM IST
- ✅ Twitter API v2 integration
- ✅ Error handling and logging
- ✅ Timezone-aware scheduling
- ✅ Environment-based configuration

## Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Twitter Developer Account** - [Sign up here](https://developer.twitter.com/)
- **Twitter API Credentials** (API Key, API Secret, Access Token, Access Token Secret)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Twitter API Credentials

1. Go to the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new project and app (or use an existing one)
3. Navigate to your app's "Keys and tokens" section
4. Generate/copy the following credentials:
   - API Key
   - API Secret
   - Access Token
   - Access Token Secret

> **Note**: Make sure your app has **Read and Write** permissions enabled.

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Twitter API credentials:
   ```
   TWITTER_API_KEY=your_actual_api_key
   TWITTER_API_SECRET=your_actual_api_secret
   TWITTER_ACCESS_TOKEN=your_actual_access_token
   TWITTER_ACCESS_TOKEN_SECRET=your_actual_access_token_secret
   ```

### 4. Run the Application

```bash
npm start
```

You should see a confirmation message:
```
🚀 Auto Tweet Generator started successfully!
📅 Scheduled to post "hello world!" every day at 11:00 AM IST
⏰ Current time: [current timestamp]
✨ Application is running... Press Ctrl+C to stop.
```

## How It Works

- The application uses `node-cron` to schedule a task that runs every day at 11:00 AM IST
- When triggered, it posts "hello world!" to your Twitter account using the Twitter API v2
- All actions are logged to the console with timestamps
- The application runs continuously until stopped (Ctrl+C)

## Deployment Options

Since this application needs to run 24/7 to post tweets on schedule, consider these deployment options:

### Option 1: Local Machine
- Keep your computer running 24/7
- Run the application in the background
- **Pros**: Free, simple setup
- **Cons**: Requires computer to stay on, uses electricity

### Option 2: Cloud Hosting (Recommended)
- **Railway**: Free tier available, easy deployment
- **Heroku**: Free tier available (with some limitations)
- **DigitalOcean**: $5/month droplet
- **AWS EC2**: Free tier for 12 months
- **Pros**: Always running, reliable
- **Cons**: May require payment after free tier

### Option 3: Raspberry Pi / VPS
- Run on a Raspberry Pi or cheap VPS
- **Pros**: Low cost, always on
- **Cons**: Requires hardware/VPS setup

## Testing

### Test Immediate Tweet Posting

To test if the Twitter API integration works, you can add this line after the startup message in `index.js`:

```javascript
// Test tweet (remove after testing)
postTweet();
```

Run the app and check if a tweet appears on your Twitter account. Remove this line after testing.

### Test Scheduler

To verify the scheduler works, temporarily change the schedule to trigger soon:

```javascript
// Change this line in index.js
const schedule = '0 11 * * *';  // Original: 11:00 AM daily

// To this (replace XX with current minute + 2)
const schedule = 'XX * * * *';  // Example: '45 * * * *' for XX:45
```

Run the app and wait for the scheduled time. Restore the original schedule after testing.

## Troubleshooting

### "Missing required environment variables"
- Make sure you've created a `.env` file (not `.env.example`)
- Verify all four credentials are filled in correctly
- Check for extra spaces or quotes around values

### "Authentication error" or "401 Unauthorized"
- Verify your API credentials are correct
- Ensure your Twitter app has **Read and Write** permissions
- Try regenerating your Access Token and Access Token Secret

### Tweet not posting at scheduled time
- Verify your system timezone or check the cron timezone setting
- Make sure the application is running continuously
- Check console logs for any error messages

## License

MIT
