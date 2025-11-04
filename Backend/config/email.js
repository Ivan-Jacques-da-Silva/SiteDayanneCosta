const nodemailer = require('nodemailer');
require('dotenv').config();

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // Zoho usa STARTTLS no 587
  auth: {
    user: process.env.SMTP_USER || 'sitedayanne@zohomail.com',
    pass: process.env.SMTP_PASS || 'y0?AYF8tK.@31pj?w@A('
  }
};

// Create transporter
const transporter = nodemailer.createTransport({
  ...EMAIL_CONFIG,
  tls: {
    rejectUnauthorized: false
  }
});

// Email templates (customer-facing text in English)
const emailTemplates = {
  contactForm: (data) => ({
    from: EMAIL_CONFIG.auth.user,
    // to: 'ivanjacques1997@gmail.com',
    to: 'dayannecosta@compass.com',
    subject: `New contact message - ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Message</h2>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
        </div>

        <div style="background: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6;">${data.message}</p>
        </div>

        <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Source:</strong> Contact Form — Dayanne Costa Website<br>
            <strong>Date:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
          </p>
        </div>
      </div>
    `
  }),

  propertyInquiry: (data, property) => ({
    from: EMAIL_CONFIG.auth.user,
    // to: 'dayannecosta@compass.com',
    to: 'dayannecosta@compass.com',
    subject: `Property Inquiry — ${property.address}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Property Inquiry</h2>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Client Information</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
        </div>

        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Interested Property</h3>
          <p><strong>Address:</strong> ${property.address}</p>
          <p><strong>City/State/ZIP:</strong> ${property.city}, ${property.state} ${property.zipCode}</p>
          <p><strong>Price:</strong> ${property.price ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(property.price) : 'N/A'}</p>
          <p><strong>Beds:</strong> ${property.beds || property.bedrooms || 'N/A'}</p>
          <p><strong>Baths:</strong> ${property.baths || property.bathrooms || 'N/A'}</p>
          <p><strong>Area:</strong> ${property.sqft ? new Intl.NumberFormat('en-US').format(property.sqft) : 'N/A'} sq ft</p>
          ${property.mlsId ? `<p><strong>MLS #:</strong> ${property.mlsId}</p>` : ''}
        </div>

        <div style="background: #fff; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Client Comments</h3>
          <p style="line-height: 1.6;">${data.message}</p>
        </div>

        ${data.propertyUrl ? `
        <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Property Link</h3>
          <p><a href="${data.propertyUrl}" style="color: #0066cc; text-decoration: none;">${data.propertyUrl}</a></p>
        </div>
        ` : ''}

        <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Source:</strong> Property Form — Dayanne Costa Website<br>
            <strong>Date:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
          </p>
        </div>
      </div>
    `
  }),

  sellRegistration: (data) => ({
    from: EMAIL_CONFIG.auth.user,
    to: 'dayannecosta@compass.com',
    subject: `Cadastro Sell - ${data.address}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Sell Registration - New Property Address Submitted</h2>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Property Information</h3>
          <p><strong>Address:</strong> ${data.address}</p>
        </div>

        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Request Details</h3>
          <p>A potential seller has submitted their property address for a home valuation. This is an initial inquiry that may lead to a listing opportunity.</p>
          <p><strong>Next Steps:</strong> Follow up with the property owner to provide a comprehensive market analysis and discuss listing services.</p>
        </div>

        <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Source:</strong> Sell Page — Home Valuation Form<br>
            <strong>Date:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}<br>
            <strong>Type:</strong> Property Address Submission
          </p>
        </div>
      </div>
    `
  }),

  buySellForm: (data) => {
    const resumo = [
      `Action: ${data.formData?.action || 'Not specified'}`,
      `Property Type: ${data.formData?.propertyType || 'Not specified'}`,
      `Price Range: ${data.formData?.priceRange || 'Not specified'}`,
      `Bedrooms: ${data.formData?.bedrooms || 'Not specified'}`,
      `Bathrooms: ${data.formData?.bathrooms || 'Not specified'}`,
      `Timeline: ${data.formData?.timeline || 'Not specified'}`
    ].join(', ');

    return {
      from: EMAIL_CONFIG.auth.user,
      // to: 'dayannecosta@compass.com',
      to: 'dayannecosta@compass.com',
      subject: `Buy/Sell Quiz Submission — ${data.firstName} ${data.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Buy/Sell Quiz Submission</h2>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
          </div>

          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Quiz Responses</h3>
            <p>${resumo}</p>
          </div>

          <div style="background: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Additional Comments</h3>
            <p style="line-height: 1.6;">${data.message}</p>
          </div>

          <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Source:</strong> Buy/Sell Quiz — Dayanne Costa Website<br>
              <strong>Date:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
            </p>
          </div>
        </div>
      `
    };
  },

  welcomeEmail: (data) => ({
    subject: 'Welcome to Dayanne Costa Real Estate',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300;">Welcome!</h1>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #2c3e50; margin-bottom: 20px; font-size: 24px;">Hello ${data.firstName}!</h2>

          <p style="color: #555; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
            Thank you for registering on our website. I'm Dayanne Costa, and I'm glad to have you here.
          </p>

          <p style="color: #555; line-height: 1.6; margin-bottom: 30px; font-size: 16px;">
            You can now explore our complete collection of properties in Miami and find exactly what you're looking for.
          </p>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://dayannecosta.com/properties" style="display: inline-block; background-color: #3498db; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">View Properties</a>
          </div>

          <p style="color: #555; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
            If you have any questions, feel free to contact me.
          </p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #777; margin: 5px 0; font-size: 14px;"><strong>Dayanne Costa</strong></p>
            <p style="color: #777; margin: 5px 0; font-size: 14px;">Licensed Real Estate Agent</p>
            <p style="color: #777; margin: 5px 0; font-size: 14px;">📱 +1 (646) 598-3588</p>
            <p style="color: #777; margin: 5px 0; font-size: 14px;">✉️ dayannecosta@compass.com</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
          <p style="color: #bdc3c7; margin: 0; font-size: 12px;">
            © 2024 Dayanne Costa Real Estate. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),
};

// Function to send email
const sendEmail = async (template, data, property = null) => {
  try {
    const emailOptions = emailTemplates[template](data, property);
    const result = await transporter.sendMail(emailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Test connection function
const testConnection = async () => {
  try {
    await transporter.verify();
    console.log('SMTP server is ready to send emails');
    return true;
  } catch (error) {
    console.error('Error testing email connection:', error);
    return false;
  }
};

module.exports = {
  sendEmail,
  testConnection,
  transporter
};