import { injectable } from "inversify";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";
import { Strategy, ExtractJwt } from "passport-jwt"; // 它是passport的一个插件

@injectable()
export class JWT {
    private secret = 'susu@#%$^%$&sefwkef'
    private jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.secret
    }
    constructor() {
        this.strategy()
    }
    public strategy() {
        const str = new Strategy(this.jwtOptions, (payload, done) => {
            done(null, payload)
        })
        passport.use(str)
    }
    static middleware() {
        // 需要经过jwt验证
        return passport.authenticate('jwt', { session: false })
    }
    /**
     * 生成token
     */
    public createToken(data: object) {
        return jsonwebtoken.sign(data, this.secret, { expiresIn: '7d' })
    }
    /**
     * 关联express
     */
    public init() {
        return passport.initialize()
    }
}