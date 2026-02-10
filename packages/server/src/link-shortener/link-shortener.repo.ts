import { Injectable } from '@nestjs/common';
import { db, ShortLink } from '../lib/db';

// Repository layer abstracts Typesaurus database operations
// Enables easier testing via mocking and isolates data access logic
@Injectable()
export class LinkShortenerRepository {
  // Creates new short link document in Firestore
  // Returns document with auto-generated ID
  async create(data: ShortLink): Promise<ShortLink & { id: string }> {
    const doc = await db.shortLinks.add(data);
    return { ...data, id: doc.id };
  }

  // Finds short link by short code using Typesaurus X query syntax
  // Uses $.field().eq() for type-safe equality comparison
  async findByShortCode(shortCode: string): Promise<ShortLink | null> {
    const results = await db.shortLinks.query(($) =>
      $.field('shortCode').eq(shortCode),
    );

    return results.length > 0 ? results[0].data : null;
  }

  // Retrieves short link by Firestore document ID
  // Typesaurus X uses typed IDs, so we pass the ID directly
  async findById(id: string): Promise<ShortLink | null> {
    const doc = await db.shortLinks.get(db.shortLinks.id(id));
    return doc ? doc.data : null;
  }

  // Increments click counter for analytics tracking
  // Uses Typesaurus update with $.increment for atomic operation
  async incrementClicks(shortCode: string): Promise<void> {
    const results = await db.shortLinks.query(($) =>
      $.field('shortCode').eq(shortCode),
    );

    if (results.length > 0) {
      const doc = results[0];
      // Atomic increment prevents race conditions from concurrent clicks
      await db.shortLinks.update(doc.ref.id, ($) => ({
        clicks: $.increment(1),
      }));
    }
  }
}
