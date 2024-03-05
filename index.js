require('dotenv').config()

const nodemailer = require('nodemailer')
const ejs = require('ejs')

// Step 1: Configure transporter with GMAIL credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
})

async function sendEmail(to, subject, template, data) {
    try {
        const html = await ejs.renderFile(__dirname + '/views/' + template + '.ejs', data, { async: true })

        const mailOptions = {
            from: 'email@domain.com',
            to,
            subject,
            html
        }

        await transporter.sendMail(mailOptions)  
        
        console.log('Message sent successfully!')
    } catch (err) {
        console.log('Error: ', err)
    }
}

sendEmail('email@domain.com', 'Dynamic Email Template with EJS', 'welcomeMessage', { userName: 'John Doe' })
// sendEmail('email@domain.com', 'Dynamic Email Template with EJS', 'anotherMessage', { accessCode: '123456' })