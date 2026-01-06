import { Logger } from "@nestjs/common";

// test-mail.js
const nodemailer = require('nodemailer');
require('dotenv').config();

function createTransport(username) {
  return nodemailer.createTransport({
    host: 'ec2-13-53-122-115.eu-north-1.compute.amazonaws.com',
    port: 587,
    secure: false,
    maxMessages: 10,
    auth: {
      user: username,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // local only
    },
    logger: true,
  });
}

async function send(username) {
  const transporter = createTransport(username);

  try {
    const info = await transporter.sendMail({
      from: 'yogeshpatel8910@gmail.com',
      to: process.env.TO_EMAIL,
      subject: `TEST from ${username}`,
      text: `Hi,
Can you tell me the status of order 45678?
Thanks`,
      // attachments: [
      //   {
      //     filename: 'image.png',
      //     path: '../../image.png', // Adjust the path as needed
      //   },
      //   {
      //     filename: 'test.xlsx',
      //     path: '../../test.xlsx', // Adjust the path as needed
      //   }
      // ],
    });

    console.log(`✅ [${username}] Mail sent →`, info.response);
  } catch (err) {
    console.error(`❌ [${username}] Failed →`, err.message);
  } finally {
    transporter.close();
  }
}

async function runTests() {
  const users = ['test1'];

  // 🔥 Parallel execution
  await Promise.all(users.map(send));
}

runTests();
