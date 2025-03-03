import jwt from "jsonwebtoken";

function authToken(req, res, next) {
  try {
    const cookies = req.headers.cookie;
    if (!cookies) return res.status(401).json({ message: "Accès refusé" });

    const token = cookies
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    if (!token) return res.stat + us(401).json({ message: "Accès refusé" });

    const actualToken = token.split("=")[1];

    jwt.verify(actualToken, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Token invalide" });
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
  }
}

export { authToken };
