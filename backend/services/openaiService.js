import { SYSTEM_PROMPT, DEFAULT_MODEL, DEFAULT_TEMPERATURE, DEFAULT_MAX_TOKENS } from "../config/constants.js";
import {
  LEAD_EXTRACTION_PROMPT,
  LEAD_EXTRACTION_SCHEMA,
} from "../domain/chat/leadExtraction.js";
import dotenv from "dotenv";

dotenv.config();

export class OpenAIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiUrl =
      process.env.OPENAI_API_URL ||
      "https://api.openai.com/v1/chat/completions";
    this.model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
  }

  validateApiKey() {
    if (!this.apiKey) {
      throw new Error("OpenAI API key not configured");
    }
  }

  formatMessages(messages) {
    return [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
    ];
  }

  async sendMessage(messages) {
    this.validateApiKey();

    const formattedMessages = this.formatMessages(messages);

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: formattedMessages,
        temperature: DEFAULT_TEMPERATURE,
        max_tokens: DEFAULT_MAX_TOKENS,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error?.message || `OpenAI API error: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return (
      data.choices[0]?.message?.content ||
      "Désolé, je n'ai pas pu générer de réponse."
    );
  }

  /**
   * Structured Outputs (json_schema) — extraction lead depuis transcript.
   * @see https://platform.openai.com/docs/guides/structured-outputs
   */
  async extractLeadCandidate(messages) {
    this.validateApiKey();

    const transcript = (messages || [])
      .map(
        (msg) =>
          `${msg.sender === "user" ? "Prospect" : "Assistant"}: ${msg.text}`,
      )
      .join("\n");

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        temperature: 0,
        max_tokens: 600,
        messages: [
          { role: "system", content: LEAD_EXTRACTION_PROMPT },
          {
            role: "user",
            content: `Conversation:\n${transcript}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "chat_lead_extraction",
            strict: true,
            schema: LEAD_EXTRACTION_SCHEMA,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error?.message || `OpenAI API error: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const raw = data.choices[0]?.message?.content;
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
}
