import nodemailer from 'nodemailer'
export const sendMail = async (options) => {
    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const mailOptions = {
        from: "Bishal Timilsina <timilsina@gmail.com> ",
        to: options.email,
        subject: options.subject,
        text: options.message,

    }


    // send email with nodemailer
    await transport.sendMail(mailOptions);
}