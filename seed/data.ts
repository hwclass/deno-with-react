import { faker } from '../deps.ts';
import { TListItem } from '../types.ts'

const fake = faker.faker

export const RANDOM_SEED_DATA: TListItem[] = [];

const generateRandomSeedData = (): TListItem => {
  return {
    engine: fake.database.engine(),
    company: fake.company.name(),
    url: fake.internet.domainName()
  };
}

Array.from({ length: 100 }).forEach(() => {
  RANDOM_SEED_DATA.push(generateRandomSeedData());
});