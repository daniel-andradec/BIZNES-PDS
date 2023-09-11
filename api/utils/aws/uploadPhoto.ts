import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { randomBytes } from 'crypto';

export const s3 = new S3Client({ 
	region: process.env.AWS_DEFAULT_REGION,
	credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCES_KEY,
    }
});

export const upload = multer({
	storage: multerS3({
		s3: s3,
		acl: 'public-read',
		bucket: process.env.AWS_BUCKET_NAME,
		contentType: multerS3.AUTO_CONTENT_TYPE,

		key: function (req, file, cb) {
			cb(null, randomBytes(10).toString('hex'));
		}
	}),

	fileFilter: (req, file: Express.Multer.File, cb) => {
		const allowedMimes = [
			'image/png',
			'image/jpg',
			'image/jpeg'
		];

		if(!allowedMimes.includes(file.mimetype)){
			cb(new Error('Invalid file type'));
		}

		cb(null, true);
	},

	//limits: { fileSize: 1 * 1024 * 1024 }
});