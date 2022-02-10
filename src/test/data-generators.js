import { faker } from '@faker-js/faker';

export const userGenerator = ( overrides ) => ({
    bio:       faker.lorem.sentence(),
    createdAt: Date.now(),
    email:     faker.internet.email(),
    firstName: faker.internet.userName(),
    id:        faker.datatype.uuid(),
    lastName:  faker.internet.userName(),
    password:  faker.internet.password(),
    role:      'ADMIN',
    teamId:    faker.datatype.uuid(),
    teamName:  faker.company.companyName(),
    ...overrides
});
export const teamGenerator = ( overrides ) => ({
    createdAt:   Date.now(),
    description: faker.lorem.sentence(),
    id:          faker.datatype.uuid(),
    name:        faker.company.companyName(),
    ...overrides
});
export const discussionGenerator = ( overrides ) => ({
    body:      faker.lorem.sentence(),
    createdAt: Date.now(),
    id:        faker.datatype.uuid(),
    title:     faker.company.catchPhrase(),
    ...overrides
});
export const commentGenerator = ( overrides ) => ({
    body:      faker.lorem.sentence(),
    createdAt: Date.now(),
    id:        faker.datatype.uuid(),
    ...overrides
});
