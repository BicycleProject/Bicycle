const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8082; 
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const multer  = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './profile'); // public/profile 폴더에 이미지 저장
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).array('image', 5);
const upload2 = multer({ storage: storage2 });

app.use(express.static(__dirname+ '/css'))
app.set('view engine', 'ejs') //ejs셋팅 끝
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static('uploads'));
app.use('/profile', express.static('profile'));

// Only allow requests from http://localhost:3000
app.use(cors({
    origin: 'http://10.20.102.175:19000'
}));

// MongoDB와 연결
mongoose.connect('mongodb+srv://admin:thddlsghgh9@cluster0.haasghd.mongodb.net/bicycle', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB 연결 오류:'));
db.once('open', () => {
console.log('MongoDB에 연결되었습니다.');

// MongoDB 연결이 성공한 후에 서버를 시작
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
});


// 모델 정의 - 이름(name), 이메일(email), 비밀번호(password), 프로필(profile)을 포함합니다.
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    profile: String,
});

// POST 요청 처리 (로그인)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 이메일로 사용자를 찾습니다.
        const user = await User.findOne({ email });

        // 사용자가 없거나 비밀번호가 일치하지 않으면 로그인 실패 메시지를 반환합니다.
        if (!user || user.password !== password) {
            return res.status(401).send('로그인 실패. 이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        // 로그인 성공 메시지와 함께 사용자 이름과 이메일을 반환합니다.
        res.json({ message: `${user.name}님 환영합니다!`, name: user.name, id: user._id});
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request.");
    }
});


// POST 요청 처리 (회원가입)
app.post('/register', [
    check("name")
    .notEmpty()
    .withMessage("이름을 필수로 입력해주세요.."),
    check("email")
    .isEmail()
    .withMessage("유효한 이메일 주소여야 합니다."),
    check("password")
    .isLength({ min : 8 })
    .withMessage("비밀번호는 최소 8자리여야 합니다.")
    .notEmpty()
    .withMessage("비밀번호는 필수 항목입니다."),
], async (req, res) => {
    //기본이미지
    const defaultProfileImagePath = '/profile/defultImage.png';

    const { name, email, password, profile = defaultProfileImagePath } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // 이메일 중복 검사
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('이미 사용 중인 이메일입니다.');
        }

        // 회원 정보 생성
        const newUser = new User({
            name,
            email,
            password,
            profile,
        });

        // 회원 정보 저장
        await newUser.save();
        
        res.send('회원가입이 완료되었습니다.');
        
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request.");
    }
});

app.post('/updateUserProfile', upload2.single('profile'), async (req, res) => {
    try {
        const { userId, name } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // 이름과 비밀번호 정보 업데이트
        if (name) user.name = name;

        // 클라이언트가 이미지를 보냈는지 확인하고 이미지 경로 업데이트
        if (req.file) {
            user.profile = 'profile/' + req.file.filename;
        }

        await user.save();
        
        res.status(200).json({ message: '사용자 프로필이 성공적으로 업데이트되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while processing your request." });
    }
});


// 사용자 프로필 정보 가져오기
app.get('/getUserProfile', async (req, res) => {
    const { userId } = req.query;

    try {
        // 유저 아이디로 사용자 찾기
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // 이미지 파일 경로를 URL로 변환
        const profileImageUrl = `http://10.20.102.175:8082/${user.profile}`;

        // 사용자 프로필 정보 반환 (이미지 URL 포함)
        res.status(200).json({ profile: profileImageUrl, name: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while processing your request." });
    }
});


// 모델 정의 - 주제(title), 내용(content), 사진 URL(imageUrl), 작성 시간(createdAt) 포함.
const Post = mongoose.model('Post', {
    _id: Number,
    title: String,
    content: String,
    imageUrls: [String],
    author: String,
    createdAt: { type: Date, default: Date.now },
    likeCount: { type: Number, default: 0 },
	likesUsers:[String],   // 이 게시글에 '좋아요'한 사용자들 목록 추가 
});

// POST 요청 처리 (게시글 작성)
app.post('/posting', upload, [
    check("title")
        .notEmpty()
        .withMessage("주제는 필수 항목입니다."),
    
    check("content")
        .notEmpty()
        .withMessage("내용은 필수 항목입니다."),
], async (req, res) => {
    
    let totalPostCount;
    try {
        const counter = await db.collection('counter').findOneAndUpdate(
            { name: '게시물갯수' },
            { $inc: { totalPost: 1 } },
            { returnOriginal: false }
        );
        
        totalPostCount = counter.value.totalPost;
        
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request.");
        return;
    }

    const { title, content, author } = req.body; 

    let imageUrls = req.files.map(file => file.path);
    
		// '\' to '/' for Windows
        if (path.sep === '\\') {
            imageUrls = imageUrls.map(imageUrl => imageUrl.replace(/\\/g, '/'));
        }
    
        try {
            const newPost = new Post({
                _id: totalPostCount,
                title,
                content,
                imageUrls,   // imageUrl 대신 imageUrls 사용
                author,
                likeCount: 0
                });
    
            await newPost.save();
    
            res.send('게시글이 성공적으로 작성되었습니다.');
    
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while processing your request.");
        }
});



//좋아요
app.post('/like', async (req, res) => {
	const { postId, userId } = req.body;

	try {
		const post = await Post.findById(postId);

        // 만약 postId에 해당하는 게시글이 없다면 에러 처리
        if (!post) {
            return res.status(404).send("Post not found");
        }

		if (!post.likesUsers.includes(userId)) {   // 현재 사용자가 아직 '좋아요'를 누르지 않았다면
			post.likesUsers.push(userId);
			post.likeCount++;
		} else {   // 현재 사용자가 이미 '좋아요'를 눌렀다면
			const index = post.likesUsers.indexOf(userId);
			post.likesUsers.splice(index, 1);
			post.likeCount--;
		}

		await post.save();

		res.status(200).send("Post liked/unliked successfully");
		
	} catch (error) {
		console.error(error);
        res.status(500).send("An error occurred while processing your request.");
    }
});


// GET 요청 처리 (게시글 목록 조회)
app.get('/posts', async (req, res) => {
    try {
        // DB에서 모든 게시글 조회
        const posts = await Post.find({}).sort({createdAt: -1});  // 최신 게시글부터 반환

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request.");
    }
});

// GET 요청 처리 (특정 게시글의 '좋아요' 상태 조회)
app.get('/likeStatus', async (req, res) => {
    const { postId, userId } = req.query;

    try {
        const post = await Post.findById(postId);

        // 만약 postId에 해당하는 게시글이 없다면 에러 처리
        if (!post) {
            return res.status(404).send("Post not found");
        }

        // 현재 사용자가 '좋아요'를 눌렀는지 여부와 현재 '좋아요' 수 반환
        res.json({ liked: post.likesUsers.includes(userId), likeCount: post.likeCount });

    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request.");
    }
});


// Comment 모델 정의
const Comment = mongoose.model('Comment', {
    postId: Number,
    userId: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
});

// 게시물에 댓글을 추가하는 POST 요청 처리
app.post('/comments', [
    check("postId")
        .notEmpty()
        .withMessage("게시물 ID가 필요합니다."),
    
    check("userId")
        .notEmpty()
        .withMessage("사용자 ID가 필요합니다."),

	check("content")
		.notEmpty()
		.withMessage("내용이 필요합니다.")
], async (req, res) => {
	const { postId, userId, content } = req.body;
	
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const newComment = new Comment({
			postId,
			userId,
			content
        });

        await newComment.save();

        res.send('댓글이 성공적으로 추가되었습니다.');

    } catch (error) {
        console.error(error);
        res.status(500).send("요청을 처리하는 동안 오류가 발생했습니다.");
    }
});

// 게시물의 모든 댓글을 가져오는 GET 요청 처리
app.get('/comments', async (req, res) => {
	const { postId } = req.query;

	try {
            const comments = await Comment.find({postId}).sort({createdAt: -1});
            res.json(comments);
            
        } catch (error) {
            console.error(error);
            res.status(500).send("요청을 처리하는 동안 오류가 발생했습니다.");
    }

});


//유저 이름 get요청
app.get('/username', async (req, res) => {
    const { userId } = req.query;

    try {
        // userId로 사용자를 찾습니다.
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        // 사용자 이름을 반환합니다.
        res.json({ username: user.name });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request.");
    }
});


// 이메일로 사용자 프로필 정보 가져오기
app.get('/getUserProfileByEmail', async (req, res) => {
    const { email } = req.query;

    try {
        // 이메일로 사용자 찾기
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        // 이미지 파일 경로를 URL로 변환
        const profileImageUrl = `http://10.20.102.175:8082/${user.profile}`;

        // 사용자 프로필 정보 반환 (이미지 URL 포함)
        res.status(200).json({ profile: profileImageUrl, name: user.name });
    } catch (error) {
        console.error(error);
        
res.status(500).json({ message: "An error occurred while processing your request." });
    }
});


app.patch('/comments/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    // 데이터베이스에서 해당 ID의 댓글 찾기
    let comment = await Comment.findById(id);
    
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    // 댓글 내용 변경 후 저장
    comment.content = content;
    await comment.save();

    res.status(200).json({ message: 'Comment updated successfully' });
});


app.delete('/comments/:id', async (req, res) => {
    const { id } = req.params;

     // 데이터베이스에서 해당 ID의 댓글 찾고 삭제하기
    let result = await Comment.findByIdAndDelete(id);

    if (!result) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
});

