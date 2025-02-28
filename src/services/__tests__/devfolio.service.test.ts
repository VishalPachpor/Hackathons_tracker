import { DevfolioService } from '../devfolio.service';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

jest.mock('@prisma/client');
jest.mock('axios');
jest.mock('redis', () => ({
  createClient: jest.fn().mockReturnValue({
    get: jest.fn(),
    set: jest.fn(),
  }),
}));

describe('DevfolioService', () => {
  let service: DevfolioService;
  const mockPrisma = {
    hackathon: {
      upsert: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    syncLog: {
      create: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (PrismaClient as jest.Mock).mockImplementation(() => mockPrisma);
    service = new DevfolioService();
  });

  describe('fetchHackathons', () => {
    const mockHackathon = {
      id: '1',
      title: 'Test Hackathon',
      description: 'Test Description',
      start_date: '2024-03-20T00:00:00Z',
      end_date: '2024-03-21T00:00:00Z',
      registration_deadline: '2024-03-19T00:00:00Z',
      participant_count: 100,
      registration_url: 'https://test.com',
      status: 'UPCOMING',
      location: 'Online',
      mode: 'ONLINE',
      prize_pool: '$1000',
      organizer: {
        name: 'Test Org',
        logo_url: 'https://test.com/logo.png',
      },
      tags: ['web3', 'blockchain'],
    };

    it('should fetch and transform hackathon data', async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { hackathons: [mockHackathon] },
      });

      await service.fetchHackathons();

      expect(mockPrisma.hackathon.upsert).toHaveBeenCalledWith({
        where: { devfolioId: mockHackathon.id },
        update: expect.objectContaining({
          title: mockHackathon.title,
          status: mockHackathon.status.toLowerCase(),
        }),
        create: expect.objectContaining({
          title: mockHackathon.title,
          status: mockHackathon.status.toLowerCase(),
        }),
      });
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (axios.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(service.fetchHackathons()).rejects.toThrow('Failed to fetch hackathons');

      expect(mockPrisma.syncLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          status: 'failed',
          message: error.message,
        }),
      });
    });
  });

  describe('getHackathons', () => {
    it('should apply filters correctly', async () => {
      const filters = {
        status: 'upcoming',
        mode: 'online',
        tags: ['web3'],
      };

      await service.getHackathons(filters);

      expect(mockPrisma.hackathon.findMany).toHaveBeenCalledWith({
        where: {
          status: filters.status,
          mode: filters.mode,
          tags: { hasEvery: filters.tags },
        },
        orderBy: [{ startDate: 'asc' }],
      });
    });
  });
}); 