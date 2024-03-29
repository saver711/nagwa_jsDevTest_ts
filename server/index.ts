// imports ✊
import express, { Application, Request, Response } from "express" // include express.
var cors = require("cors") // providing a Connect/Express middleware to enable CORS.
import dotenv from "dotenv" //load environment variables from a .env file
import fs from "fs"
const bodyParser = require("body-parser")

// config 👨‍🔧
const app: Application = express() // start a new Express application
app.use(cors())
dotenv.config()

/* VARS */
const jsonParser = bodyParser.json()

// localData 🗃️
interface POS_Data_Type {
  wordList: string[]
  scoresList: number[]
}
const POS_Data: POS_Data_Type = JSON.parse(
  fs.readFileSync("DummyData/TestData.json", "utf8")
)

const wordList = POS_Data.wordList
const scoresList = POS_Data.scoresList

//routes 🔀

/* ----- ⬇️ get WordList ----- */
const desiredListLength = 10

app.get("/words", (_req: Request, res: Response) => {
  const shuffledWords = wordList.sort(() => Math.random() - 0.5) //shuffle list
  const words = shuffledWords.slice(0, desiredListLength) // slice list
  res.json(words)
})

/* ----- ⬇️ get score and post rank ----- */
app.post("/rank", jsonParser, (req: Request, res: Response) => {
  const studentScore: number = req.body.score

  let scoresBelowStudentScore = 0
  scoresList.map((score) => score < studentScore && scoresBelowStudentScore++)

  const rank = (scoresBelowStudentScore / scoresList.length) * 100

  /* - ⬇️ EXAMPLE: 30% || 30.26% - */
  const sentRank = rank % 1 != 0 ? rank.toFixed(2) : rank

  res.json(sentRank)
})

// make the server listen to requests 🙉
const PORT = process.env.PORT || 8000
app.listen(PORT, () =>
  console.log(`Server is running at: http://localhost:${PORT}/`)
)
