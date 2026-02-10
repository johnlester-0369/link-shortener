import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { LinkShortenerRepository } from './link-shortener.repo';

// Custom validator to check if custom alias is already taken
// Prevents duplicate short codes in database
@ValidatorConstraint({ name: 'isAliasUnique', async: true })
@Injectable()
export class IsAliasUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly repository: LinkShortenerRepository) {}

  // Queries database to verify alias isn't already in use
  // Returns false if alias exists (validation fails)
  async validate(alias: string): Promise<boolean> {
    if (!alias) return true; // Skip validation if no alias provided

    const existing = await this.repository.findByShortCode(alias);
    return !existing; // Returns true if NOT found (unique)
  }

  defaultMessage(args: ValidationArguments): string {
    return `Custom alias "${args.value}" is already taken. Please choose another.`;
  }
}
