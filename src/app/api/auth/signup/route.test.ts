import { POST } from './route';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
  },
}));

describe('Signup API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockRequest = (body: any) => {
    return new Request('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  it('should return 400 for invalid input', async () => {
    const req = mockRequest({ email: 'invalid', password: 'short' });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.message).toBe('Invalid input');
  });

  it('should return 409 if user already exists', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({ id: '1', email: 'test@example.com' } as any);
    
    const req = mockRequest({ name: 'Test', email: 'test@example.com', password: 'password1234' });
    const res = await POST(req);
    
    expect(res.status).toBe(409);
    const data = await res.json();
    expect(data.message).toBe('User already exists with this email');
  });

  it('should create a user and return 201', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(null);
    vi.mocked(bcrypt.hash).mockResolvedValueOnce('hashedPassword' as never);
    vi.mocked(prisma.user.create).mockResolvedValueOnce({ id: '1', email: 'test@example.com' } as any);

    const req = mockRequest({ name: 'Test User', email: 'test@example.com', password: 'password1234' });
    const res = await POST(req);

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.message).toBe('User created successfully');
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedPassword',
      },
    });
  });

  it('should return 500 on server error', async () => {
    vi.mocked(prisma.user.findUnique).mockRejectedValueOnce(new Error('DB Error'));

    const req = mockRequest({ name: 'Test User', email: 'test@example.com', password: 'password1234' });
    const res = await POST(req);

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.message).toBe('Internal server error');
  });
});
