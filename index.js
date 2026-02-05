require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cron = require('node-cron');

// Validate environment variables
const requiredEnvVars = [
    'TWITTER_API_KEY',
    'TWITTER_API_SECRET',
    'TWITTER_ACCESS_TOKEN',
    'TWITTER_ACCESS_TOKEN_SECRET',
    'GEMINI_API_KEY',
    'TWEET_TOPICS',
    'TWEET_TIMES'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    console.error('❌ Error: Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease copy .env.example to .env and fill in your credentials.');
    process.exit(1);
}

// Initialize Twitter API client
const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const rwClient = twitterClient.readWrite;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Parse topics and times from environment
const topics = process.env.TWEET_TOPICS.split(',').map(t => t.trim());
const tweetTimes = process.env.TWEET_TIMES.split(',').map(t => t.trim());

/**
 * Selects a random topic from the configured topics
 */
function selectRandomTopic() {
    return topics[Math.floor(Math.random() * topics.length)];
}

/**
 * Generates a tweet using Gemini AI based on a given topic
 * @param {string} topic - The topic to generate a tweet about
 * @returns {Promise<string>} - The generated tweet text
 */
async function generateTweet(topic) {
    try {
         const prompt = `Generate a single tweet about "${topic}" that feels written by a real human, not a bot. Make it a banger: super funny, hilarious, sarcastic, or witty, tying into the latest trends or viral moments for extra punch.

        Tone & style:
        - Witty, clever, and sometimes lightly sarcastic
        - Funny or playful when appropriate
        - Conversational and scroll-stopping
        - Smart, not cringe or try-hard

        Rules:
        - Maximum 280 characters
        - **CRITICAL:** Vary the length significantly. mostly give me short punchy tweets (60-90 chars), sometimes medium (100-150 chars), and rarely longer ones (200 chars).
        - No quotation marks
        - Do not use em dashes
        - Do not use ellipsis
        - Avoid generic motivational or marketing tone
        - Avoid hashtags
        - **CRITICAL:** Use natural phrasing, subtle humor, or a surprising angle
        - **CRITICAL:** Incorporate current trends, memes, or pop culture refs naturally to make it timely and fresh

        Return only the tweet text, nothing else.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let tweet = response.text().trim();

        // Ensure tweet is under 280 characters
        if (tweet.length > 280) {
            tweet = tweet.substring(0, 277) + '...';
        }

        return tweet;
    } catch (error) {
        console.error('❌ Error generating tweet with AI:', error.message);
        // Fallback to a simple tweet if AI fails
        return `Exploring the world of ${topic} today! #${topic.replace(/\s+/g, '')}`;
    }
}

/**
 * Posts a tweet with AI-generated content
 */
async function postTweet() {
    try {
        const topic = selectRandomTopic();
        console.log(`🎯 Selected topic: ${topic}`);
        console.log('🤖 Generating tweet with AI...');

        const tweetText = await generateTweet(topic);
        console.log(`📝 Generated tweet: "${tweetText}"`);

        const tweet = await rwClient.v2.tweet(tweetText);
        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        console.log(`✅ Tweet posted successfully at ${timestamp}`);
        console.log(`   Tweet ID: ${tweet.data.id}`);
        console.log(`   Topic: ${topic}\n`);
    } catch (error) {
        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        console.error(`❌ Error posting tweet at ${timestamp}:`, error.message);
        if (error.data) {
            console.error('Error details:', JSON.stringify(error.data, null, 2));
        }
    }
}

// Schedule tweets for multiple times per day
console.log('🚀 Auto Tweet Generator started successfully!');
console.log(`📅 Configured to post AI-generated tweets ${tweetTimes.length} times daily`);
console.log(`🎯 Topics: ${topics.join(', ')}`);
console.log(`⏰ Posting times (IST): ${tweetTimes.join(', ')}`);
console.log(`⏰ Current time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
console.log('✨ Application is running... Press Ctrl+C to stop.\n');

// Create cron schedules for each posting time
tweetTimes.forEach((time, index) => {
    const [hour, minute] = time.split(':');
    const cronExpression = `${minute} ${hour} * * *`;

    cron.schedule(cronExpression, () => {
        console.log(`⏰ Scheduled task #${index + 1} triggered - posting tweet...`);
        postTweet();
    }, {
        scheduled: true,
        timezone: 'Asia/Kolkata'
    });

    console.log(`✓ Schedule #${index + 1} set: ${time} IST (${cronExpression})`);
});

console.log('\n📢 All schedules active!\n');
