import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

const prismaClientSingleton = () => {
    const url = process.env.DATABASE_URL || 'file:./dev.db'
    // better-sqlite3 needs the path without 'file:' prefix
    const dbPath = url.replace(/^file:/, '')
    const db = new Database(dbPath)
    const adapter = new PrismaBetterSqlite3({ url })
    return new PrismaClient({ adapter })
}

const globalForPrisma = global as unknown as { prisma: ReturnType<typeof prismaClientSingleton> }

export const prisma = globalForPrisma.prisma || prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
