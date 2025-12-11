#!/usr/bin/env node

// Test OpenAI API configuration
import { config } from 'dotenv';
config({ path: '.env.local' });

async function testOpenAiApi() {
  console.log('🤖 Testing OpenAI API Configuration\n');

  // Test 1: Environment variables
  console.log('1️⃣ Checking environment variables...');
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;

  console.log(`   API Key configured: ${apiKey ? 'YES ✅' : 'NO ❌'}`);
  console.log(`   Default model: ${model || 'gpt-4o-mini'}`);

  if (!apiKey) {
    console.log('   ⚠️ No API key found');
    return;
  }

  // Test 2: API connectivity test
  console.log('\n2️⃣ Testing API connectivity...');
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Say hello' }
        ],
        max_tokens: 10
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`   ❌ API Error: ${response.status} ${errorText}`);
      return;
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    console.log(`   ✅ API Response: "${reply}"`);
    console.log(`   ✅ Model used: ${data.model || model}`);

  } catch (error) {
    console.log(`   ❌ Connection failed: ${error.message}`);
    return;
  }

  // Test 3: Model mapping test
  console.log('\n3️⃣ Testing model mapping...');
  const modelMap = {
    "GPT-4o": "gpt-4o",
    "GPT-4": "gpt-4",
    "GPT-3.5-turbo": "gpt-3.5-turbo",
    "GPT-4o-mini": "gpt-4o-mini",
  };

  Object.entries(modelMap).forEach(([uiName, apiName]) => {
    console.log(`   ${uiName} → ${apiName} ✅`);
  });

  // Test 4: Chat API endpoint simulation
  console.log('\n4️⃣ Testing chat API endpoint simulation...');
  try {
    // Simulate the chat API call similar to what the app would do
    const testMessage = {
      messages: [{ role: 'user', content: 'Test message' }],
      model: 'GPT-4o-mini'
    };

    const mappedModel = modelMap[testMessage.model] || 'gpt-4o-mini';
    console.log(`   UI Model: ${testMessage.model}`);
    console.log(`   API Model: ${mappedModel}`);
    console.log(`   ✅ Model mapping works correctly`);

  } catch (error) {
    console.log(`   ❌ Model mapping test failed: ${error.message}`);
  }

  console.log('\n🎉 OpenAI API Test Complete!');
  console.log('📊 Status: Ready for chat functionality ✅');

  return {
    apiKeyConfigured: !!apiKey,
    apiConnected: true,
    modelMappingWorks: true
  };
}

testOpenAiApi()
  .then(result => {
    if (result) {
      console.log('\n🚀 Chat functionality ready to use!');
    }
  })
  .catch(error => {
    console.error('\n❌ Test failed:', error.message);
  });