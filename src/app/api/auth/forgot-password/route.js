import { NextResponse } from 'next/server'
import User from "../../../../../models/User";
import dbConnect from "../../../../../lib/dbConnect";
import crypto from "crypto"
import nodemailer from "nodemailer"

export async function POST(request) {
    await dbConnect();
    const reqData = await request.json()

    const { email } = reqData
    try {
        const user = await User.findOne({ email });
    
        if (!user) {
          return NextResponse.json("user not found", { status: 404 })
        }
    
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpires = Date.now() + 3600000 * 2; // 1 hour from now
    
        await User.updateOne(
            { email }, 
            { 
              resetToken,
              resetTokenExpires
            } 
          );
    
        const transporter = nodemailer.createTransport({
          host: "ahmedatri.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD, // generated ethereal password
          },
        });
    
        const mailOptions = {
          from: "NEXTAUTH <noreply@ahmedatri.com>",
          to: email,
          subject: "Réinitialisation de mot de passe NEXTAUTH",
          html: emailBody(user.name, `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`, "1 heure"),
        };
    
        try {
          const info = await transporter.sendMail(mailOptions);
          console.log(info);
          return NextResponse.json("sent", { status: 200 })
        } catch (err) {
          console.log(err);
          return NextResponse.json(err.message, { status: 400 })
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json(error.message, { status: 400 })
      }

}

function emailBody(name, link, expiration) {
    return `
    <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Réinitialisation de votre mot de passe NEXTAUTH</title>
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 16px;
          line-height: 1.5;
          color: #333;
          padding: 20px;
        }
        h1{
          font-size:32px;
          font-weight:bold;
          color:#dc2626;
          text-align:center;
          border-bottom:1px solid #e2e8f0;
          padding-bottom:10px;
          margin:0;
          margin-bottom:20px;
          
        }
        h2 {
          font-size: 20px;
          font-weight: bold;
          margin-top: 40px;
          margin-bottom: 20px;
        }
        p {
          margin-top: 0;
          margin-bottom: 20px;
        }
        p:first-of-type{
          text-transform: capitalize;
        }
        a {
          display:block;
          width:fit-content;
          color: #ffe357 !important;
          font-weight: bold;
          background-color: #0364ad;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 150ms;
        }
        a:hover {
          background-color: #0b3671;
        }
        .ps {
          font-size: 12px;
          margin-top: 20px;
        }
        .container{
          max-width:600px;
          margin:auto;
          border:1px solid #e2e8f0;
          border-radius:5px;
          padding:50px 30px;
        }
  
        .logo-container{
          display: flex;
          justify-content: center;
        }
  
        .logo{
          height: 100px;
        }
      </style>
    </head>
    <body>
      <section class="container">
          <div class="logo-container">
              NEXTAUTH
          </div>
          <h2>Réinitialisation de mot de passe</h2>
          <p>Bonjour ${name},</p>
          <p>Vous avez demandé à réinitialiser votre mot de passe sur NEXTAUTH. Pour accéder à votre compte, veuillez cliquer sur le lien ci-dessous:</p>
          <p><a href="${link}">Réinitialiser votre mot de passe</a></p>
          <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
          <p>Cordialement,<br />L'équipe de Ahmed Atri</p>
          <p class="ps">PS: Ce lien expirera dans ${expiration}. Veuillez le réinitialiser à nouveau si nécessaire.</p>
      </section>
    </body>
  </html>
  `;
  }