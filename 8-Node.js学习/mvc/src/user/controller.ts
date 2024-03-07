import {
    controller,
    httpGet as GetMapping,
    httpPost as PostMapping,
} from 'inversify-express-utils'
import { UserService } from './services'
import { inject } from 'inversify'
import type { Request, Response } from 'express'

@controller('/user')
export class User {
    constructor(@inject(UserService) private readonly UserService: UserService) { }
    @GetMapping('/index')
    public async getIndex(req: Request, res: Response) {
        const result = await this.UserService.getList()
        res.send(result)
    }
    @PostMapping('/create')
    public async createUser(req: Request, res: Response) {
        const result = await this.UserService.createUser(req.body)
        res.send(result)
    }
}
