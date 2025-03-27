const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const { Video } = require('../models/Video');

const { auth } = require('../middleware/auth');
const uploadDir = path.join(__dirname, '../../uploads');
// Multer storage configuration
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, uploadDir);
    },
    filename(req, file, done) {
      // 파일명을 어떤 이름으로 올릴지
      const ext = path.extname(file.originalname); // 파일의 확장자
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일이름 + 날짜 + 확장자 이름으로 저장
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5메가로 용량 제한
});
//inpa.tistory.com/entry/EXPRESS-📚-multer-미들웨어 [Inpa Dev 👨‍💻:티스토리]
//=================================
// Video upload route
//=================================

router.post('/uploadfiles', upload.single('file'), (req, res) => {
  // 업로드 성공 후 파일 경로와 이름을 반환
  return res.json({
    success: true,
    filePath: res.req.file.path, // 올바른 참조: req.file.path
    fileName: res.req.file.filename, // 올바른 참조: req.file.filename
  });
});
router.post('/thumbnail', (req, res) => {
  let thumbsFilePath = '';
  let fileDuration = '';

  // 파일 경로를 로그로 출력하여 확인
  console.log('Received file path:', req.body.filePath);

  // 파일 경로가 비어 있으면 오류 처리
  if (!req.body.filePath) {
    console.error('No file path provided');
    return res
      .status(400)
      .json({ success: false, message: 'No file path provided' });
  }

  const filePath = path.resolve(__dirname, req.body.filePath);
  console.log('Resolved file path:', filePath);

  // 파일이 존재하는지 확인
  fs.exists(filePath, (exists) => {
    if (!exists) {
      console.error('File does not exist:', filePath);
      return res
        .status(400)
        .json({ success: false, message: 'File not found' });
    }

    // ffprobe로 메타데이터 조회
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        console.error('Error during ffprobe:', err);
        return res.status(500).json({
          success: false,
          message: 'Error retrieving video metadata',
          error: err,
        });
      }

      fileDuration = metadata.format.duration;

      // 썸네일 생성
      ffmpeg(filePath)
        .on('filenames', function (filenames) {
          console.log('Will generate ' + filenames.join(', '));
          thumbsFilePath = '/uploads/thumbnails/' + filenames[0];
        })
        .on('end', function () {
          console.log('Screenshots taken');
          return res.json({
            success: true,
            thumbsFilePath: thumbsFilePath,
            fileDuration: fileDuration,
          });
        })
        .screenshots({
          count: 3,
          folder: '../uploads/thumbnails',
          size: '320x240',
          filename: 'thumbnail-%b.png',
        });
    });
  });
});

router.post('/uploadVideo', async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save(); // Use async/await to save the video
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.get('/getVideos', async (req, res) => {
  try {
    const videos = await Video.find().populate('writer');
    res.status(200).json({ success: true, videos });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/getVideo/:videoId', async (req, res) => {
  try {
    const videoId = req.params.videoId;

    const video = await Video.findOne({ _id: videoId })
      .populate('writer')
      .exec();
    res.status(200).json({ success: true, video });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
