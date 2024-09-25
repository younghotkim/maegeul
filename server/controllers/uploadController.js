// controllers/uploadController.js
const path = require("path");

// 파일 업로드 컨트롤러
const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "파일이 업로드되지 않았습니다." });
    }

    // 업로드된 파일 경로를 클라이언트에 반환
    res.status(200).json({
      message: "파일이 성공적으로 업로드되었습니다.",
      filePath: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "파일 업로드 중 오류가 발생했습니다.", error });
  }
};

module.exports = {
  uploadFile,
};
