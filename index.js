require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const cron = require('node-cron');

// Validate environment variables
const requiredEnvVars = [
    'TWITTER_API_KEY',
    'TWITTER_API_SECRET',
    'TWITTER_ACCESS_TOKEN',
    'TWITTER_ACCESS_TOKEN_SECRET'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    console.error('❌ Error: Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease copy .env.example to .env and fill in your Twitter API credentials.');
    process.exit(1);
}

// Initialize Twitter API client
const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Get read-write client
const rwClient = twitterClient.readWrite;

/**
 * Posts a tweet with the message "hello world!"
 */
async function postTweet() {
    try {
        const tweet = await rwClient.v2.tweet('hello world');
        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        console.log(`✅ Tweet posted successfully at ${timestamp}`);
        console.log(`   Tweet ID: ${tweet.data.id}`);
    } catch (error) {
        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        console.error(`❌ Error posting tweet at ${timestamp}:`, error.message);
        if (error.data) {
            console.error('Error details:', JSON.stringify(error.data, null, 2));
        }
    }
}

// Schedule tweet for 2:18 PM IST every day
// Cron format: minute hour day month weekday
// '18 14 * * *' = At 2:18 PM (14:18) every day
const schedule = '18 14 * * *';

cron.schedule(schedule, () => {
    console.log('⏰ Scheduled task triggered - posting tweet...');
    postTweet();
}, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
});

// Startup message
console.log('🚀 Auto Tweet Generator started successfully!');
console.log(`📅 Scheduled to post "hello world!" every day at 2:18 PM IST`);
console.log(`⏰ Current time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
console.log('✨ Application is running... Press Ctrl+C to stop.\n');
