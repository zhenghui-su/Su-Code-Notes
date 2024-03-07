/*
 * @Author: 苏征辉 343196323@qq.com
 * @Date: 2024-03-02 15:32:32
 * @LastEditors: 苏征辉 343196323@qq.com
 * @Description: 
 */
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export class PrismaDB {
    prisma: PrismaClient;
    constructor (@inject('PrismaClient') PrismaClient: () => PrismaClient) {
        this.prisma = PrismaClient();
    }
}