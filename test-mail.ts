import { Logger } from "@nestjs/common";

// test.js
const nodemailer = require('nodemailer');
require('dotenv').config();
const test1 = nodemailer.createTransport({
  host: '127.0.0.1',
  port: 2525,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: 'test1',
    pass: process.env.SMTP_PASS,
  },
});
const test2 = nodemailer.createTransport({
  host: '127.0.0.1',
  port: 2525,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: 'test2',
    pass: process.env.SMTP_PASS,
  },
});
const test3 = nodemailer.createTransport({
  host: '127.0.0.1',
  port: 2525,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: 'test3',
    pass: process.env.SMTP_PASS,
  },
});

async function send(t) {
  try {
    const info = await t.sendMail({
      from: 'yogeshpatel8910@gmail.com',
      to: process.env.TO_EMAIL,
      subject: 'TEST',
      text: `Hi,
Can you tell me the status of order 45678?
Thanks`,
    });

    console.log('✅ Mail sent', info.response);
  } catch (err) {
    if (err.code === 'EENVELOPE') {
      console.error('❌ SMTP rejected sender:', err.response);
    } else {
      console.error('❌ Mail failed:', err);
    }
  }
}
async function runTests() {
  await send(test1);
  await send(test2);
  await send(test3);
}

runTests();
