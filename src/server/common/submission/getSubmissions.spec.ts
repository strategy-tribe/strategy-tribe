import {
  Context,
  createMockContext,
  MockContext,
} from '@/lib/prisma/prismaContext';
import { faker } from '@faker-js/faker';
import { Rol } from '@prisma/client';
import { getSubmissions } from './getSubmissions';
import { iGetSubmissionsSchema } from './schemas';

let mockCtx: MockContext;
let ctx: Context;
type User = {
  address: string;
  profileId: string;
  rol: Rol;
  signature: string;
};

let adminUser: User;
let staffUser: User;
let currUser: User;
let otherUser: User;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
  adminUser = {
    address: faker.finance.ethereumAddress(),
    profileId: faker.datatype.uuid(),
    rol: 'ADMIN',
    signature: faker.datatype.hexadecimal(),
  };
  staffUser = {
    address: faker.finance.ethereumAddress(),
    profileId: faker.datatype.uuid(),
    rol: 'STAFF',
    signature: faker.datatype.hexadecimal(),
  };
  currUser = {
    address: faker.finance.ethereumAddress(),
    profileId: faker.datatype.uuid(),
    rol: 'REGULAR',
    signature: faker.datatype.hexadecimal(),
  };
  otherUser = {
    address: faker.finance.ethereumAddress(),
    profileId: faker.datatype.uuid(),
    rol: 'REGULAR',
    signature: faker.datatype.hexadecimal(),
  };
});

describe('submissions auth', () => {
  it('allows users to not pass their id to access their submissions', async () => {
    const params: iGetSubmissionsSchema = {
      bounties: ['1'],
    };
    const results = await getSubmissions(params, currUser, mockCtx.prisma);

    expect(results).toBeTruthy();
  });

  describe('blocks users from fetching submission that are not theirs', () => {
    it("when they ask for only other's", async () => {
      const params: iGetSubmissionsSchema = {
        bounties: ['1'],
        owners: [otherUser.profileId],
      };

      await expect(
        getSubmissions(params, currUser, mockCtx.prisma)
      ).rejects.toThrow('UNAUTHORIZED');
    });

    it("when they combine theirs and other's", async () => {
      const params: iGetSubmissionsSchema = {
        bounties: ['1'],
        owners: [currUser.profileId, otherUser.profileId],
      };

      await expect(
        getSubmissions(params, currUser, mockCtx.prisma)
      ).rejects.toThrow('UNAUTHORIZED');
    });
  });

  it('allows ADMIN to access all submissions', async () => {
    const user = adminUser;
    const params: iGetSubmissionsSchema = {
      bounties: ['1'],
      owners: [otherUser.profileId],
    };
    const results = await getSubmissions(params, user, mockCtx.prisma);

    expect(user.rol).toBe('ADMIN');
    expect(results).toBeTruthy();
  });

  it('allows STAFF to access all submissions', async () => {
    const params: iGetSubmissionsSchema = {
      bounties: ['1'],
      owners: [otherUser.profileId],
    };
    const results = await getSubmissions(params, staffUser, mockCtx.prisma);

    expect(staffUser.rol).toBe('STAFF');
    expect(results).toBeTruthy();
  });
});
