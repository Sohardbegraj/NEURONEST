import express  from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";


const app= express();
app.use(express.json());
app.use(cors());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const PORT=3000;

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username=req.body.username
    
    try {
        
        await UserModel.create({
            username:username,
            email: email,
            password: password
        }) 
        res.json({
            message: "User signed up"
            
        })
    } catch(e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post("/", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)
        res.json({
            token,
            message: "Login successful"
        });
    } else {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
})

app.post("/addcontent", userMiddleware, async (req, res) => {
    try {
        const link = req.body.link;
        const type = req.body.type;
        const title = req.body.title;
        const description = req.body.description;

        // Parse tags properly
        let tags = req.body.tags;
        if (typeof tags === "string") {
            try {
                tags = JSON.parse(tags);
            } catch (err) {
                tags = [tags];
            }
        }

        await ContentModel.create({
            link,
            type,
            title,
            description,
            userId: req.userId,
            tags,
        });

        res.json({ message: "Content added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});


app.get("/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
try{
    await ContentModel.findByIdAndDelete(contentId);
    res.json({
        message: "Deleted",
        contentId: req.body.contentId
    })
}
    catch(err){
        res.json({
            message:"error",err
        })
    }   
})

app.post("/content/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/content/share/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        email: user.email,
        content: content
    })

})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));