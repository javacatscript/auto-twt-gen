# Auto Tweet Generator 🐦

Automated Node.js application that posts AI-generated tweets to Twitter multiple times daily using Google Gemini AI.

## Features

- ✅ **AI-Powered Tweet Generation** using Google Gemini
- ✅ **Multiple Daily Posts** (configurable times)
- ✅ **Custom Topics** (configurable via environment variables)
- ✅ **Automated Scheduling** with timezone support (IST)
- ✅ **Error Handling** and comprehensive logging
- ✅ **Topic Rotation** for varied content

## Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Twitter Developer Account** - [Sign up here](https://developer.twitter.com/)
- **Google Gemini API Key** - [Get it here](https://makersuite.google.com/app/apikey)

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

### 3. Get Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

> **Note**: The free tier allows 15 requests per minute, which is more than enough for this application.

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```
   # Twitter API
   TWITTER_API_KEY=your_actual_api_key
   TWITTER_API_SECRET=your_actual_api_secret
   TWITTER_ACCESS_TOKEN=your_actual_access_token
   TWITTER_ACCESS_TOKEN_SECRET=your_actual_access_token_secret
   
   # Google Gemini API
   GEMINI_API_KEY=your_actual_gemini_api_key
   
   # Tweet Configuration
   TWEET_TOPICS=AI,technology,productivity,coding,innovation,startups
   TWEET_TIMES=9:00,14:00,19:00
   ```

3. **Customize your settings**:
   - `TWEET_TOPICS`: Comma-separated list of topics for AI to generate tweets about
   - `TWEET_TIMES`: Comma-separated posting times in 24-hour format (HH:MM) in IST timezone

### 5. Run the Application

```bash
npm start
```

You should see output like:
```
🚀 Auto Tweet Generator started successfully!
📅 Configured to post AI-generated tweets 3 times daily
🎯 Topics: AI, technology, productivity, coding, innovation, startups
⏰ Posting times (IST): 9:00, 14:00, 19:00
⏰ Current time: 3/2/2026, 2:30:00 pm
✨ Application is running... Press Ctrl+C to stop.

✓ Schedule #1 set: 9:00 IST (0 9 * * *)
✓ Schedule #2 set: 14:00 IST (0 14 * * *)
✓ Schedule #3 set: 19:00 IST (0 19 * * *)

📢 All schedules active!
```

## How It Works

1. **Topic Selection**: The app randomly selects a topic from your configured list
2. **AI Generation**: Google Gemini AI generates a creative, engaging tweet (max 280 chars) about the selected topic
3. **Posting**: The tweet is posted to your Twitter account
4. **Scheduling**: This process repeats at each configured time daily
5. **Logging**: All actions are logged with timestamps and details

### Example Tweet Flow

```
⏰ Scheduled task #1 triggered - posting tweet...
🎯 Selected topic: AI
🤖 Generating tweet with AI...
📝 Generated tweet: "AI is transforming how we work and live. From personalized recommendations to autonomous systems, the future is being written in code. What's your favorite AI application? #AI #Technology"
✅ Tweet posted successfully at 3/2/2026, 9:00:00 am
   Tweet ID: 1234567890123456789
   Topic: AI
```

## Configuration Options

### Topics

Edit `TWEET_TOPICS` in your `.env` file to customize topics:

```bash
# Tech-focused
TWEET_TOPICS=AI,machine learning,web development,cloud computing,cybersecurity

# Business-focused
TWEET_TOPICS=startups,entrepreneurship,marketing,leadership,innovation

# Mixed topics
TWEET_TOPICS=productivity,health,fitness,motivation,learning
```

### Posting Times

Edit `TWEET_TIMES` to set when tweets are posted (IST timezone):

```bash
# Morning, afternoon, evening
TWEET_TIMES=9:00,14:00,19:00

# Business hours only
TWEET_TIMES=10:00,13:00,17:00

# Post 5 times a day
TWEET_TIMES=8:00,11:00,14:00,17:00,20:00
```

## Deployment Options

Since this application needs to run 24/7 to post tweets on schedule, consider these deployment options:

### Option 1: Cloud Hosting (Recommended)
- **Railway**: Free tier available, easy deployment
- **Heroku**: Free tier available (with some limitations)
- **DigitalOcean**: $5/month droplet
- **AWS EC2**: Free tier for 12 months
- **Pros**: Always running, reliable
- **Cons**: May require payment after free tier

### Option 2: Local Machine
- Keep your computer running 24/7
- Run the application in the background
- **Pros**: Free, simple setup
- **Cons**: Requires computer to stay on

### Option 3: Raspberry Pi / VPS
- Run on a Raspberry Pi or cheap VPS
- **Pros**: Low cost, always on
- **Cons**: Requires hardware/VPS setup

## Testing

### Test AI Tweet Generation

To test tweet generation without posting, add this to the end of `index.js`:

```javascript
// Test tweet generation
(async () => {
  const topic = selectRandomTopic();
  console.log(`Testing with topic: ${topic}`);
  const tweet = await generateTweet(topic);
  console.log(`Generated: ${tweet}`);
})();
```

### Test Immediate Posting

To test posting immediately:

```javascript
// Test immediate post
postTweet();
```

Remove test code after verification.

## Troubleshooting

### "Missing required environment variables"
- Make sure you've created a `.env` file (not `.env.example`)
- Verify all required fields are filled in
- Check for extra spaces or quotes around values

### "Authentication error" or "401 Unauthorized"
- Verify your Twitter API credentials are correct
- Ensure your Twitter app has **Read and Write** permissions
- Try regenerating your Access Token and Access Token Secret

### "Gemini API error"
- Verify your Gemini API key is correct
- Check you haven't exceeded rate limits (15 requests/min on free tier)
- Ensure you have internet connectivity

### Tweets not posting at scheduled time
- Verify your system timezone or check the cron timezone setting
- Make sure the application is running continuously
- Check console logs for any error messages
- Verify `TWEET_TIMES` format is correct (HH:MM)

### Generated tweets are repetitive
- Add more topics to `TWEET_TOPICS`
- The AI naturally varies content, but more topics = more variety

## License

MIT

---

**Happy Tweeting! 🚀**
