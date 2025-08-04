import nodemailer from 'nodemailer';
import { Booking } from '@/types';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

// Create transporter
let transporter: nodemailer.Transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport(emailConfig);
  }
  return transporter;
}

// Email templates
const generateBookingConfirmationEmail = (booking: Booking, tripTitle: string) => {
  return {
    subject: `Booking Confirmation - ${tripTitle} | Sophie's Tours`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #D2691E, #8B4513); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #ddd; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .btn { display: inline-block; background: #D2691E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          td { padding: 10px; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; width: 150px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sophie's Tours</h1>
            <p>Your African Adventure Awaits!</p>
          </div>
          
          <div class="content">
            <h2>Booking Confirmation</h2>
            <p>Dear ${booking.guest_name},</p>
            
            <p>Thank you for choosing Sophie's Tours! Your booking has been received and is currently being processed.</p>
            
            <div class="highlight">
              <strong>Confirmation Code: ${booking.confirmation_code}</strong><br>
              Please keep this code for your records.
            </div>
            
            <h3>Booking Details</h3>
            <table>
              <tr>
                <td class="label">Tour:</td>
                <td>${tripTitle}</td>
              </tr>
              <tr>
                <td class="label">Participants:</td>
                <td>${booking.participants} person${booking.participants > 1 ? 's' : ''}</td>
              </tr>
              <tr>
                <td class="label">Total Price:</td>
                <td>€${booking.total_price.toLocaleString()}</td>
              </tr>
              <tr>
                <td class="label">Zinzino Program:</td>
                <td>${booking.includes_zinzino ? 'Yes - Included' : 'No'}</td>
              </tr>
              <tr>
                <td class="label">Status:</td>
                <td>${booking.status}</td>
              </tr>
            </table>
            
            ${booking.special_requests ? `
              <h3>Special Requests</h3>
              <p>${booking.special_requests}</p>
            ` : ''}
            
            <h3>What's Next?</h3>
            <ol>
              <li>We will review your booking and contact you within 24 hours</li>
              <li>Payment instructions will be provided via email</li>
              <li>Once payment is confirmed, you'll receive detailed travel information</li>
              ${booking.includes_zinzino ? '<li>Zinzino health program materials will be sent separately</li>' : ''}
            </ol>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
          </div>
          
          <div class="footer">
            <p><strong>Sophie's Tours</strong><br>
            Email: info@sophies-tours.com<br>
            Phone: +49 XXX XXXXXXX</p>
            
            <p>Creating extraordinary travel experiences that transform lives.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      BOOKING CONFIRMATION - Sophie's Tours
      
      Dear ${booking.guest_name},
      
      Thank you for choosing Sophie's Tours! Your booking has been received.
      
      CONFIRMATION CODE: ${booking.confirmation_code}
      
      BOOKING DETAILS:
      - Tour: ${tripTitle}
      - Participants: ${booking.participants}
      - Total Price: €${booking.total_price.toLocaleString()}
      - Zinzino Program: ${booking.includes_zinzino ? 'Yes' : 'No'}
      - Status: ${booking.status}
      
      ${booking.special_requests ? `Special Requests: ${booking.special_requests}\n` : ''}
      
      WHAT'S NEXT:
      1. We will review your booking and contact you within 24 hours
      2. Payment instructions will be provided via email
      3. Once payment is confirmed, you'll receive detailed travel information
      ${booking.includes_zinzino ? '4. Zinzino health program materials will be sent separately' : ''}
      
      Contact: info@sophies-tours.com | +49 XXX XXXXXXX
      
      Sophie's Tours - Creating extraordinary travel experiences that transform lives.
    `
  };
};

// Send booking confirmation email
export async function sendBookingConfirmation(booking: Booking, tripTitle: string) {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Email service not configured - skipping email send');
      return { success: false, error: 'Email service not configured' };
    }

    const email = generateBookingConfirmationEmail(booking, tripTitle);
    const transporter = getTransporter();

    const mailOptions = {
      from: `"Sophie's Tours" <${process.env.SMTP_USER}>`,
      to: booking.guest_email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent:', result.messageId);
    
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return { success: false, error: error };
  }
}

// Send admin notification email
export async function sendAdminNotification(booking: Booking, tripTitle: string) {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Email service not configured - skipping admin notification');
      return { success: false, error: 'Email service not configured' };
    }

    const transporter = getTransporter();

    const mailOptions = {
      from: `"Sophie's Tours System" <${process.env.SMTP_USER}>`,
      to: 'admin@sophies-tours.com',
      subject: `New Booking: ${tripTitle} | ${booking.confirmation_code}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Confirmation Code:</strong> ${booking.confirmation_code}</p>
        <p><strong>Tour:</strong> ${tripTitle}</p>
        <p><strong>Guest:</strong> ${booking.guest_name} (${booking.guest_email})</p>
        <p><strong>Phone:</strong> ${booking.guest_phone || 'Not provided'}</p>
        <p><strong>Participants:</strong> ${booking.participants}</p>
        <p><strong>Total Price:</strong> €${booking.total_price.toLocaleString()}</p>
        <p><strong>Zinzino Program:</strong> ${booking.includes_zinzino ? 'Yes' : 'No'}</p>
        ${booking.special_requests ? `<p><strong>Special Requests:</strong> ${booking.special_requests}</p>` : ''}
        
        <p>Please review and process this booking in the admin panel.</p>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent:', result.messageId);
    
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { success: false, error: error };
  }
}

// Test email configuration
export async function testEmailConfiguration() {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return { success: false, error: 'Email credentials not configured' };
    }

    const transporter = getTransporter();
    await transporter.verify();
    
    return { success: true, message: 'Email configuration is valid' };
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return { success: false, error: error };
  }
}

export default {
  sendBookingConfirmation,
  sendAdminNotification,
  testEmailConfiguration
};