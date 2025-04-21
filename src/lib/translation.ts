// Translation utility for Korean <-> English

export async function translateText(text: string, targetLang: 'ko' | 'en'): Promise<string> {
  if (!text) return '';
  
  try {
    // Here you would normally use a translation API like Google Translate
    // For demo purposes, we'll use OpenAI's API for translation
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a translator. Translate the following text to ${targetLang === 'ko' ? 'Korean' : 'English'}. Only respond with the translation, nothing else.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Translation error:', error);
    // Fallback translation for demo (remove in production)
    if (targetLang === 'ko') {
      return `[자동 번역] ${text}`;
    } else {
      return `[Auto-translated] ${text}`;
    }
  }
} 