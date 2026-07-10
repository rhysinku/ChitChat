const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const api = {
  baseURL: BASE_URL,

  get: async <T>(path: string): Promise<T> => {
    throw new Error("API not yet implemented -- waiting for Fastify backend");
  },

  post: async <T>(path: string, body: unknown): Promise<T> => {
    throw new Error("API not yet implemented -- waiting for Fastify backend");
  },
};
