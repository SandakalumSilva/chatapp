import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ msg: "Rate limit exceeded" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ msg: "Forbidden - Bot detected" });
      } else {
        return res.status(403).json({ msg: "Access denied" });
      }
    }

    if(decision.results.some(isSpoofedBot)) {
        return res.status(403).json({
            error: "Spoofed bot detected",
            message: "Malicious bot activity detected"
        })
    }
    next();
  } catch (error) {
    console.log("Arcjet Protection Error", error);
    next();
  }
};
