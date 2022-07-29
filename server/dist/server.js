"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var cors = require("cors");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const bodyParser = require("body-parser");
const path = require('path');
const app = (0, express_1.default)();
app.use(cors());
dotenv_1.default.config();
const jsonParser = bodyParser.json();
const POS_Data = JSON.parse(fs_1.default.readFileSync("./DummyData/TestData.json", "utf8"));
const wordList = POS_Data.wordList;
const scoresList = POS_Data.scoresList;
const desiredListLength = 10;
app.get("/words", (_req, res) => {
    const shuffledWords = wordList.sort(() => Math.random() - 0.5);
    const words = shuffledWords.slice(0, desiredListLength);
    res.json(words);
});
app.post("/rank", jsonParser, (req, res) => {
    const studentScore = req.body.score;
    let scoresBelowStudentScore = 0;
    scoresList.map((score) => score < studentScore && scoresBelowStudentScore++);
    const rank = (scoresBelowStudentScore / scoresList.length) * 100;
    const sentRank = rank % 1 != 0 ? rank.toFixed(2) : rank;
    res.json(sentRank);
});
app.use(express_1.default.static(path.resolve(__dirname, "../../client/build")));
app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}/`));
//# sourceMappingURL=server.js.map