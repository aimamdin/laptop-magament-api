// passportConfig.ts
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { PassportStatic } from "passport";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";
dotenv.config();
const userRepository = AppDataSource.getRepository(User);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

export default function configurePassport(passport: PassportStatic): void {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await userRepository.findOne({
          where: { id: jwt_payload.id },
        });

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
}
