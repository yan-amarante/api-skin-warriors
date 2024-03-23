import { Request, Response } from 'express'

import { listSales, createSale, closeSale } from '../../sales/controllers'

import database, { disconnectFromDatabase } from '../../database'


jest.mock('../../database');

describe('Sales Controller', () => {

  let req: Partial<Request>

  let res: Partial<Response>

  beforeEach(() => {

    req = {} as Partial<Request>

    res = {

      status: jest.fn().mockReturnThis(),

      send: jest.fn(),

    } as Partial<Response>

  })

  afterEach(() => {

    jest.clearAllMocks()

  })

  afterAll(async () => {

    await disconnectFromDatabase()

  })


  it('should list sales', async () => {

    (req.query as any) = { page: "1" };

    (database.query as jest.Mock).mockImplementation(async (query: string) => {

      if (query.includes('SELECT count(*) FROM sales')) {

        return { rows: [{ count: 14 }] };

      } else if (query.includes('SELECT * FROM sales')) {

        return { rows: [{ id: 1, image: 'image1', name: 'item1', pattern: 'pattern1', wear: 'wear1', price: 10, category: 'category1' }] };

      }

      throw new Error('Invalid query');

    });

    await listSales(req as Request, res as Response);

    expect(database.query).toHaveBeenCalledTimes(2); 

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ numberOfPages: 1 }));

  });

  it('should list sales with all parameters', async () => {

    (req.query as any) = { page: "1", name: "Desert Eagle", wear: "Pouco Usada" };

    (database.query as jest.Mock).mockImplementation(async (query: string) => {

      if (query.includes('SELECT count(*) FROM sales WHERE name=$1 AND wear=$2')) {

        return { rows: [{ count: 140 }] };

      } else if (query.includes('SELECT * FROM sales WHERE name=$2 AND wear=$3 OFFSET $1 LIMIT 14')) {

        return { rows: [{ id: 1, image: 'image1', name: 'Desert Eagle', pattern: 'pattern1', wear: 'Pouco Usada', price: 10, category: 'category1' }] };

      }

      throw new Error('Invalid query');

    });

    await listSales(req as Request, res as Response);

    expect(database.query).toHaveBeenCalledTimes(2); 

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ numberOfPages: 10 }));

  });

  it('should create a sale', async () => {

    req.body = { image: 'test-image', name: 'test-name', pattern: 'test-pattern', wear: 'test-wear', price: 20, category: 'test-category' };

    (database.query as jest.Mock).mockResolvedValueOnce({});

    await createSale(req as Request, res as Response);

    expect(database.query).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.send).toHaveBeenCalledWith({ message: 'sucesso' });

  });

  it('should close a sale', async () => {

    req.params = { id: "1" };

    (database.query as jest.Mock).mockResolvedValueOnce({});

    await closeSale(req as Request, res as Response);

    expect(database.query).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.send).toHaveBeenCalledWith({ message: 'sucesso' });

  });

});

