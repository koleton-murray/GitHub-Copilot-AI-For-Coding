import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const links = pgTable(
  'links',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    originalUrl: text('original_url').notNull(),
    shortCode: text('short_code').notNull().unique(),
    userId: text('user_id').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index('links_user_id_idx').on(table.userId)],
);
