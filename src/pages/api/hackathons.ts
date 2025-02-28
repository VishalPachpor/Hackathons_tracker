import { NextApiRequest, NextApiResponse } from "next";
import { DevfolioService } from "@/services/devfolio.service";

const devfolioService = new DevfolioService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { status, mode, tags } = req.query;

      const filters: {
        status?: string;
        mode?: string;
        tags?: string[];
      } = {};

      if (status && typeof status === "string") {
        filters.status = status;
      }

      if (mode && typeof mode === "string") {
        filters.mode = mode;
      }

      if (tags) {
        filters.tags = Array.isArray(tags) ? tags : [tags as string];
      }

      const hackathons = await devfolioService.getHackathons(filters);
      return res.status(200).json(hackathons);
    } catch (error) {
      console.error("Failed to fetch hackathons:", error);
      return res.status(500).json({ error: "Failed to fetch hackathons" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
