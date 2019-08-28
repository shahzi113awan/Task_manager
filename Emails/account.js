const sgMail = require('@sendgrid/mail')
const sgApiKey = process.env.SENDGRID_API_KEY
sgMail.setApiKey(sgApiKey)
const sendWelcomeEmail =(email,name)=>{
sgMail.send({
    to:email,
    from:'shahzi113awan@gmail.com',
    subject:'Welcome Note',
    text:`would you die for me? HaHAHAHA${name}`
})}
module.exports ={
    sendWelcomeEmail
}