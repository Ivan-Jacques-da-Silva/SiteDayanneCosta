
const nodemailer = require('nodemailer');

// Email configuration
const EMAIL_CONFIG = {
  service: 'gmail', // ou outro provedor
  host: 'smtp.gmail.com', // ou smtp do Compass se disponível
  port: 587,
  secure: false, // true para 465, false para outras portas
  auth: {
    user: 'site@compass.com', // email que será criado
    pass: 'y0?AYF8tK.@31pj?w@A(' // senha fornecida
  }
};

// Create transporter
const transporter = nodemailer.createTransporter({
  ...EMAIL_CONFIG,
  tls: {
    rejectUnauthorized: false
  }
});

// Email templates
const emailTemplates = {
  contactForm: (data) => ({
    from: EMAIL_CONFIG.auth.user,
    to: 'dayannecosta@compass.com',
    subject: `Nova mensagem de contato - ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Nova Mensagem de Contato</h2>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Informações do Contato:</h3>
          <p><strong>Nome:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${data.phone}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Mensagem:</h3>
          <p style="line-height: 1.6;">${data.message}</p>
        </div>
        
        <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Origem:</strong> Formulário de Contato - Site Dayanne Costa<br>
            <strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    `
  }),

  propertyInquiry: (data, property) => ({
    from: EMAIL_CONFIG.auth.user,
    to: 'dayannecosta@compass.com',
    subject: `Interesse em Propriedade - ${property.address}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Interesse em Propriedade</h2>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Informações do Cliente:</h3>
          <p><strong>Nome:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${data.phone}</p>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Propriedade de Interesse:</h3>
          <p><strong>Endereço:</strong> ${property.address}</p>
          <p><strong>Cidade:</strong> ${property.city}, ${property.state} ${property.zipCode}</p>
          <p><strong>Preço:</strong> ${property.price ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(property.price) : 'N/A'}</p>
          <p><strong>Quartos:</strong> ${property.beds || property.bedrooms || 'N/A'}</p>
          <p><strong>Banheiros:</strong> ${property.baths || property.bathrooms || 'N/A'}</p>
          <p><strong>Área:</strong> ${property.sqft ? new Intl.NumberFormat('en-US').format(property.sqft) : 'N/A'} sq ft</p>
          ${property.mlsId ? `<p><strong>MLS #:</strong> ${property.mlsId}</p>` : ''}
        </div>
        
        <div style="background: #fff; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Comentários do Cliente:</h3>
          <p style="line-height: 1.6;">${data.message}</p>
        </div>
        
        <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Origem:</strong> Formulário de Propriedade - Site Dayanne Costa<br>
            <strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    `
  })
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
    console.log('Email server is ready to take our messages');
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
