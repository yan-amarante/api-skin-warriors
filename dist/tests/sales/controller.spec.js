"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../sales/controllers");
const database_1 = __importStar(require("../../database"));
jest.mock('../../database');
describe('Sales Controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(async () => {
        await (0, database_1.disconnectFromDatabase)();
    });
    it('should list sales', async () => {
        req.query = { page: "1" };
        database_1.default.query.mockImplementation(async (query) => {
            if (query.includes('SELECT count(*) FROM sales')) {
                return { rows: [{ count: 14 }] };
            }
            else if (query.includes('SELECT * FROM sales')) {
                return { rows: [{ id: 1, image: 'image1', name: 'item1', pattern: 'pattern1', wear: 'wear1', price: 10, category: 'category1' }] };
            }
            throw new Error('Invalid query');
        });
        await (0, controllers_1.listSales)(req, res);
        expect(database_1.default.query).toHaveBeenCalledTimes(2);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ numberOfPages: 1 }));
    });
    it('should list sales with all parameters', async () => {
        req.query = { page: "1", name: "Desert Eagle", wear: "Pouco Usada" };
        database_1.default.query.mockImplementation(async (query) => {
            if (query.includes('SELECT count(*) FROM sales WHERE name=$1 AND wear=$2')) {
                return { rows: [{ count: 140 }] };
            }
            else if (query.includes('SELECT * FROM sales WHERE name=$2 AND wear=$3 OFFSET $1 LIMIT 14')) {
                return { rows: [{ id: 1, image: 'image1', name: 'Desert Eagle', pattern: 'pattern1', wear: 'Pouco Usada', price: 10, category: 'category1' }] };
            }
            throw new Error('Invalid query');
        });
        await (0, controllers_1.listSales)(req, res);
        expect(database_1.default.query).toHaveBeenCalledTimes(2);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ numberOfPages: 10 }));
    });
    it('should create a sale', async () => {
        req.body = { image: 'test-image', name: 'test-name', pattern: 'test-pattern', wear: 'test-wear', price: 20, category: 'test-category' };
        database_1.default.query.mockResolvedValueOnce({});
        await (0, controllers_1.createSale)(req, res);
        expect(database_1.default.query).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'sucesso' });
    });
    it('should close a sale', async () => {
        req.params = { id: "1" };
        database_1.default.query.mockResolvedValueOnce({});
        await (0, controllers_1.closeSale)(req, res);
        expect(database_1.default.query).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'sucesso' });
    });
});
//# sourceMappingURL=controller.spec.js.map