import { PrismaClient } from '@prisma/client';

const initDB = () => {
	return new PrismaClient();
};

const db = initDB();
export default db;

export async function cleanDB(client: PrismaClient) {
	const tbs = await client.$queryRawUnsafe<{ tablename: string }[]>(
		"SELECT tablename FROM pg_tables WHERE schemaname='public'",
	);
	for (const { tablename } of tbs) {
		if (tablename !== '_prisma_migrations') {
			try {
				await client.$queryRawUnsafe('TRUNCATE TABLE "public"."${tablename}" CASCADE;');
			} catch (error) {
				console.error(error);
			}
		}
	}
}

export type DBTransaction = Omit<
	PrismaClient,
	'$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export type DBInstance = PrismaClient | DBTransaction;
export function startTransaction<R>(
	dbInstance: DBInstance,
	fn: (prisma: DBTransaction) => Promise<R>,
	options: { maxWait?: number; timeout?: number } = { maxWait: 20000, timeout: 50000 },
): Promise<R> {
	if ('$transaction' in dbInstance && typeof dbInstance.$transaction === 'function') {
		return dbInstance.$transaction<R>(fn, options);
	}

	return fn(dbInstance);
}
