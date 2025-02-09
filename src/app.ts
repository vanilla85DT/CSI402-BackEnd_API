// 65076751 Athitaya Chaisiriwattanasai

import express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

interface RedeemRequest {
    studentId: string;
    amount: number;
}

const initialPoints = 1000; //แต้มที่จารกำหนดให้

app.post("/spumem/points", (req: Request, res: Response) => {
    try {
        const { studentId, amount }: RedeemRequest = req.body;

        if (!studentId || amount === undefined) {
            return res.status(400).json({ status: "400", msg: "ข้อมูลไม่ครบถ้วน" });
        }

        //เงินมากกว่า 0 เป็นจำนวนเต็ม
        if (!Number.isInteger(amount) || amount <= 0) {
            return res.status(400).json({ status: "400", msg: "จำนวนเงินไม่ถูกต้อง" });
        }

        //นับแต้ม
        const earnPoints = Math.floor(amount / 100) * 10;
        const totalPoints = initialPoints + earnPoints;

        return res.status(200).json({
            status: "200",
            msg: "สะสมแต้มสำเร็จแล้ว",
            data: {
                studentId,
                earnPoints,
                totalPoints,
            },
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: "500",
            msg: "เกิดข้อผิดพลาด",
        });
    }
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
