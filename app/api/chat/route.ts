import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with the provided API key
const GEMINI_API_KEY = 'AIzaSyDE4Lvui0vY6sW90eK5vV74K11mFsvxnZ8';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Try gemini-1.5-flash first (faster and more reliable), fallback to gemini-pro
    let model;
    try {
      model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    } catch (e) {
      // Fallback to gemini-pro if flash is not available
      model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    }

    // Generate response
    const prompt = `You are a helpful AI assistant for EduLearn, an educational platform. 
    Provide friendly, informative, and concise responses. If asked about courses, universities, 
    or educational programs, provide helpful information. Keep responses clear and professional.
    
    User message: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json(
      { response: text },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // Handle specific error types
    let errorMessage = 'Failed to generate response. Please try again.';
    let statusCode = 500;

    if (error instanceof Error) {
      const errorMsg = error.message.toLowerCase();
      
      if (errorMsg.includes('api_key') || errorMsg.includes('api key') || errorMsg.includes('permission')) {
        errorMessage = 'Invalid API key or insufficient permissions. Please check your API key configuration.';
        statusCode = 401;
      } else if (errorMsg.includes('quota') || errorMsg.includes('rate limit') || errorMsg.includes('429')) {
        errorMessage = 'API quota exceeded or rate limit reached. Please try again later.';
        statusCode = 429;
      } else if (errorMsg.includes('safety') || errorMsg.includes('blocked')) {
        errorMessage = 'The message was blocked by safety filters. Please rephrase your question.';
        statusCode = 400;
      } else if (errorMsg.includes('model') || errorMsg.includes('not found')) {
        errorMessage = 'The requested model is not available. Please try again.';
        statusCode = 404;
      } else {
        errorMessage = error.message || errorMessage;
      }
    } else if (error && typeof error === 'object') {
      // Handle Google AI SDK specific errors
      if (error.statusCode) {
        statusCode = error.statusCode;
      }
      if (error.message) {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: statusCode }
    );
  }
}

