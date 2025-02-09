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

app.post("/registration/tempAcount" , (req:Request,res:Response) =>{
    const {firstName,lastName,idCard,birthDay,email} = req.body
    
    if (!firstName || !lastName || !idCard || !birthDay || !email) {
        res.status(400).json({
            status:"400",
             msg:"pls chk rqs bd" 
        })
    } else {
        res.status(200).json({
            status:"200",
            msg:"ok",
            data:{
                username:"TA000210342",
                psd:"00023A",
                email:"ta000210342@taiwan.com",
            }
        })
    }
});

app.post("/screen-code", (req: Request, res: Response) => {
    // Implement the logic for the screen code functionality here
    res.status(200).json({
        status: "200",
        msg: "Screen code endpoint is working",
    });
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
