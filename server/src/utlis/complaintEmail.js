import nodemailer from "nodemailer";

export const senComplaintdMail = async (options) => {
    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL, // Your email
            pass: process.env.EMAIL_PASSWORD, // Your app password
        },
    });

    const mailOptions = {
        from: options.email, 
        to: process.env.EMAIL,
        replyTo: options.email,
        subject: options.subject,
        text: options.message,
    };

    // Send email with nodemailer
    await transport.sendMail(mailOptions);
};
