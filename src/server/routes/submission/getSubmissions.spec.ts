import {
  Context,
  createMockContext,
  MockContext,
} from '@/server/prisma/prismaContext';
import { faker } from '@faker-js/faker';
import { Rol } from '@prisma/client';

import { GetSubmissionsParams, _getSubmissions } from './getSubmissions';

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
    const params: GetSubmissionsParams = {
      bounties: ['slug1'],
    };
    await expect(
      _getSubmissions(params, currUser, mockCtx.prisma)
    ).resolves.not.toThrow('UNAUTHORIZED');
  });

  describe('blocks users from fetching submission that are not theirs', () => {
    it("when they ask for only other's", async () => {
      const params: GetSubmissionsParams = {
        bounties: ['1'],
        owners: [otherUser.profileId],
      };

      await expect(
        _getSubmissions(params, currUser, mockCtx.prisma)
      ).rejects.toThrow('UNAUTHORIZED');
    });

    it("when they combine theirs and other's", async () => {
      const params: GetSubmissionsParams = {
        bounties: ['1'],
        owners: [currUser.profileId, otherUser.profileId],
      };

      await expect(
        _getSubmissions(params, currUser, mockCtx.prisma)
      ).rejects.toThrow('UNAUTHORIZED');
    });
  });

  it('allows ADMIN to access all submissions', async () => {
    const user = adminUser;
    const params: GetSubmissionsParams = {
      bounties: ['1'],
      owners: [otherUser.profileId],
    };
    await expect(
      _getSubmissions(params, user, mockCtx.prisma)
    ).resolves.not.toThrow('UNAUTHORIZED');

    expect(user.rol).toBe('ADMIN');
  });

  it('allows STAFF to access all submissions', async () => {
    const user = staffUser;

    const params: GetSubmissionsParams = {
      bounties: ['1'],
      owners: [otherUser.profileId],
    };
    await expect(
      _getSubmissions(params, user, mockCtx.prisma)
    ).resolves.not.toThrow('UNAUTHORIZED');

    expect(user.rol).toBe('STAFF');
  });
});
