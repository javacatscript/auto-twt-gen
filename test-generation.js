require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Validate environment variables
if (!process.env.GEMINI_API_KEY) {
    console.error('❌ Error: Missing GEMINI_API_KEY in .env file');
    process.exit(1);
}

if (!process.env.TWEET_TOPICS) {
    console.error('❌ Error: Missing TWEET_TOPICS in .env file');
    process.exit(1);
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Parse topics
const topics = process.env.TWEET_TOPICS.split(',').map(t => t.trim());

function selectRandomTopic() {
    return topics[Math.floor(Math.random() * topics.length)];
}

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
        - **CRITICAL:** Vary the length significantly. mostly give me short punchy tweets (50-80 chars), sometimes medium (100-150 chars), and occasionally longer ones (200 chars).
        - No quotation marks
        - Do not use em dashes
        - Do not use ellipsis
        - Avoid generic motivational or marketing tone
        - Avoid hashtags
        - Use natural phrasing, subtle humor, or a surprising angle
        - Incorporate current trends, memes, or pop culture refs naturally to make it timely and fresh

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
        return null;
    }
}

async function runTest() {
    console.log('🧪 Starting AI Tweet Generation Test...\n');
    console.log(`🎯 Configured Topics: ${topics.join(', ')}\n`);

    console.log('----------------------------------------');

    // Generate 1 sample
    for (let i = 1; i <= 1; i++) {
        const topic = selectRandomTopic();
        process.stdout.write(`Generating sample ${i}/5 (Topic: ${topic})... `);

        const tweet = await generateTweet(topic);

        console.log('\n');
        if (tweet) {
            console.log(tweet);
            console.log(`\n(Length: ${tweet.length} chars)`);
        }
        console.log('----------------------------------------');
    }

    console.log('\n✅ Test complete! You can update the prompt in index.js based on these results.');
}

runTest();
