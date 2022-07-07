"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var cors = require("cors");
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
app.use(cors());
dotenv_1.default.config();
const client = new mongodb_1.MongoClient(process.env.MONGODB);
let data;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const database = client.db(process.env.DB);
            const collection = database.collection(process.env.DB_COLLECTION);
            data = yield collection.findOne({ type: "pos" });
        }
        finally {
            yield client.close();
        }
    });
}
run().catch(console.dir);
app.get("/words", (_req, res) => {
    res.json(data);
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}/`));
//# sourceMappingURL=server.js.map