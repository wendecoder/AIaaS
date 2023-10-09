// pages/api/services/[service].ts
import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest } from 'next';
import prisma from '@/app/lib/prisma'; // Import your Prisma client
import cloudinary from 'cloudinary';
import { stringify } from 'querystring';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

// Use as any to avoid TypeScript error
const cloudinaryInstance = cloudinary.v2 as any;

cloudinaryInstance.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(request: Request, { params }: { params: { service: string } }) {
    console.log("Entered the services page");
    try {
        // const router = useRouter();
        const service: string = params.service;
        console.log(service);
      // Insert data into the Prisma database based on the service
      switch (service) {
        case 'aniclassify':
          const formData = await request.formData();

          // Access form fields and files from formData
          const userEmail = formData.get('userEmail');
          const result = formData.get('result') as string;
          const imageFile = formData.get('image') as File;
          console.log(userEmail);
          console.log(result);
          console.log(imageFile);
          if (!imageFile) {
            console.log("invalid request data");
              return new NextResponse(stringify({ error: 'Invalid request data' }));
          }

          // Find the user by email or create a new user
          const user = await prisma.user.findUnique({
            where: { email: userEmail as string },
          });
          // Define the directory where you want to temporarily store the image
          const uploadDir = path.join(__dirname, 'uploads'); // Change this to your desired path

          // Ensure the directory exists, create it if necessary
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          // Generate a unique filename for the uploaded image (you can use a library like `uuid`)
          const uniqueFilename = `${Date.now()}_${imageFile.name}`;
          const imagePath = path.join(uploadDir, uniqueFilename);
          console.log(imagePath);
          // Create a write stream to save the image
          const writeStream = fs.createWriteStream(imagePath);
          const imageBuffer = await imageFile.arrayBuffer();

          // Write the image buffer to the file
          writeStream.write(Buffer.from(imageBuffer));
          writeStream.end();
          console.log('going good till now');
          // Upload the image from the temporary path to Cloudinary
          const cloudinaryUploadResponse = await cloudinaryInstance.uploader.upload(imagePath, {
            folder: 'aniclassify', // Optional folder in your Cloudinary account
            resource_type: 'auto', // Automatically detect the resource type (image, video, etc.)
          });

          // Delete the temporarily stored image file
          fs.unlinkSync(imagePath);
          console.log(cloudinaryUploadResponse);
          await prisma.aniClassify.create({
              data: {
              userId: Number(user?.id),
              animalImage: cloudinaryUploadResponse.secure_url, // Store the Cloudinary URL
              result,
              },
          });
          break;
        case 'medicognize':
          const MediformData = await request.formData();
          // Access form fields and files from formData
          const MediuserEmail = MediformData.get('userEmail');
          const Mediresult = MediformData.get('result') as string;
          const MediimageFile = MediformData.get('image') as File;
          const MediDiseaseType = MediformData.get('type') as string;
          if (!MediimageFile) {
            console.log("invalid request data");
              return new NextResponse(stringify({ error: 'Invalid request data' }));
          }

          // Find the user by email or create a new user
          const MediUser = await prisma.user.findUnique({
            where: { email: MediuserEmail as string },
          });
          // Define the directory where you want to temporarily store the image
          const MediUploadDir = path.join(__dirname, 'uploads'); // Change this to your desired path

          // Ensure the directory exists, create it if necessary
          if (!fs.existsSync(MediUploadDir)) {
            fs.mkdirSync(MediUploadDir, { recursive: true });
          }

          // Generate a unique filename for the uploaded image (you can use a library like `uuid`)
          const MediuniqueFilename = `${Date.now()}_${MediimageFile.name}`;
          const MediimagePath = path.join(MediUploadDir, MediuniqueFilename);
          console.log(MediimagePath);
          // Create a write stream to save the image
          const MediwriteStream = fs.createWriteStream(MediimagePath);
          const MediimageBuffer = await MediimageFile.arrayBuffer();

          // Write the image buffer to the file
          MediwriteStream.write(Buffer.from(MediimageBuffer));
          MediwriteStream.end();
          console.log('going good till now');
          // Upload the image from the temporary path to Cloudinary
          const MedicloudinaryUploadResponse = await cloudinaryInstance.uploader.upload(MediimagePath, {
            folder: 'medicognize', // Optional folder in your Cloudinary account
            resource_type: 'auto', // Automatically detect the resource type (image, video, etc.)
          });

          // Delete the temporarily stored image file
          fs.unlinkSync(MediimagePath);
          console.log(MedicloudinaryUploadResponse);
          await prisma.medicognize.create({
            data: {
            userId: Number(MediUser?.id),
            diseaseType: MediDiseaseType,
            diseaseImage: MedicloudinaryUploadResponse.secure_url, // Store the Cloudinary URL
            result: Mediresult,
            },
          });
          break;
        case 'sentix':
          const SentFormData = await request.formData();
          const SentUserEmail = SentFormData.get('userEmail') as string;
          const SentSentence = SentFormData.get('sentence') as string;
          const SentResult = SentFormData.get('sentResult') as string;

          const SentUser = await prisma.user.findUnique({
            where: {email: SentUserEmail},
          })

          if(SentUser){
            try {
              const createdSentix = await prisma.sentix.create({
                data: {
                  userId: Number(SentUser?.id),
                  sentence: SentSentence,
                  result: SentResult
                }
              });
            
              // The operation was successful, and createdSentix contains the created record
              console.log("Sentix record created:", createdSentix);
              break;
            } catch (error) {
              // An error occurred during the create operation
              console.error("Error creating Sentix record:", error);
            }
            
          }
        case 'semsearch':
            const SemFormData = await request.formData();
            const SemUserEmail = SemFormData.get('userEmail') as string;
            const SemUserQuery = SemFormData.get('userQuery') as string;
            const SemResults = SemFormData.get('results') as string;

            const SemUser = await prisma.user.findUnique({
              where: {email: SemUserEmail},
            })

            if(SemUser){
              try{
                const createdSem = await prisma.aIsemanticSearch.create({
                  data:{
                    userId: Number(SemUser?.id),
                    userQuery: SemUserQuery,
                    results: SemResults,
                  }
                })

                console.log("Semantic record created:", createdSem)
                break;
              }
              catch (error){
                console.error("Error creating Semantic record:", error);
              }
            }
        case 'cryptorush':
          
        // Add cases for other services
      }

      return new NextResponse(JSON.stringify({ message: 'Data inserted successfully' }));
    } catch (error) {
      console.error('Error while inserting data:', error);
      return new NextResponse(JSON.stringify({ error: 'An error occurred while inserting data' }));
    }
}
