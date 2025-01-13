import nodemailer from 'nodemailer'
export const sendMail = async (options) => {
    const transport = nodemailer.createTransport({
        host: process.env.HOSTNAME,
        port: 2525,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const mailOptions = {
        from: "Bishal Timilsina <bishal@gmail.com> ",
        to: options.email,
        subject: options.subject,
        text: options.message,

    }


    // send email with nodemailer
    await transport.sendMail(mailOptions);
}