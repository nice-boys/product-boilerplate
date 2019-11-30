// @flow
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../database/generated/client";

// Only store the user ID in the cookie and in the req.user property
passport.serializeUser((user: { id: string }, done) => done(null, user.id));
passport.deserializeUser((data, done) => {
  done(null, data);
});

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
  throw new Error(
    "Please provide the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET env variables in the .env file in the root of the project."
  );

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback"
    },
    async (_, __, profile, done) => {
      const existing = await prisma.user({
        googleId: profile.id
      });
      if (existing) return done(undefined, existing);

      return prisma
        .createUser({
          name:
            profile.displayName ||
            (profile.name &&
              (profile.name.givenName || "") +
                (profile.name.middleName || "") +
                (profile.name.familyName || "")) ||
            "Anonymous",
          googleId: profile.id,
          email:
            Array.isArray(profile.emails) && profile.emails.length > 0
              ? profile.emails[0].value
              : undefined,
          avatarUrl:
            Array.isArray(profile.photos) && profile.photos.length > 0
              ? profile.photos[0].value
              : undefined
        })
        .then(user => done(undefined, user))
        .catch(err => done(err));
    }
  )
);

export default passport;
