# UC Services CRM - Complete Backend System

A comprehensive Customer Relationship Management (CRM) and Business Management backend system built with Node.js, Express.js, and MongoDB. This system provides a complete solution for managing leads, contacts, deals, projects, invoices, tasks, and more.

## 🚀 Features

### Core CRM Features
- **Lead Management**: Complete lead lifecycle from capture to conversion
- **Contact Management**: Comprehensive contact database with company associations
- **Deal Pipeline**: Sales pipeline management with stages and forecasting
- **Task Management**: Task assignment, tracking, and collaboration
- **Project Management**: Project planning, team management, and progress tracking
- **Invoice Management**: Professional invoicing with PDF generation and email delivery

### Advanced Features
- **Multi-tenant Architecture**: Organization-based data isolation
- **Role-based Access Control**: Granular permissions system
- **Email Template System**: Customizable email templates for all communications
- **Notification System**: Email, SMS, and WhatsApp notifications with queue processing
- **Dashboard & Analytics**: Real-time insights and reporting
- **File Management**: Document upload and management with cloud storage
- **API Rate Limiting**: Protection against abuse
- **Security**: Comprehensive security measures including XSS protection, data sanitization

### Notification & Communication
- **Email Notifications**: Automated email notifications using Nodemailer (Gmail SMTP)
- **SMS Notifications**: SMS alerts using Twilio
- **WhatsApp Integration**: WhatsApp messaging through Twilio
- **Queue System**: Bull queue for reliable notification delivery
- **Notification Logging**: Complete audit trail of all notifications
- **Template Engine**: Dynamic content with placeholder replacement

### Invoice System
- **Professional Invoicing**: Create, edit, and manage invoices
- **PDF Generation**: Automatic PDF generation with company branding
- **Email Delivery**: Send invoices directly to clients
- **Payment Tracking**: Track payment status and history
- **Recurring Invoices**: Automated recurring billing
- **Public Invoice Links**: Secure shareable invoice links
- **Multiple Currencies**: Support for different currencies

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer (Gmail SMTP)
- **SMS/WhatsApp**: Twilio
- **Queue Processing**: Bull with Redis
- **PDF Generation**: PDFKit
- **File Upload**: Multer with Cloudinary
- **Security**: Helmet, XSS Clean, Express Rate Limit
- **Validation**: Express Validator
- **Documentation**: Auto-generated API docs

## 📁 Project Structure

```
src/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── leadController.js     # Lead management
│   ├── contactController.js  # Contact management
│   ├── dealController.js     # Deal pipeline
│   ├── taskController.js     # Task management
│   ├── projectController.js  # Project management
│   ├── invoiceController.js  # Invoice system
│   └── ...
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── errorHandler.js      # Global error handling
│   └── ...
├── models/
│   ├── User.js              # User model
│   ├── Organization.js      # Organization model
│   ├── Lead.js              # Lead model
│   ├── Contact.js           # Contact model
│   ├── Deal.js              # Deal model
│   ├── Task.js              # Task model
│   ├── Project.js           # Project model
│   ├── Invoice.js           # Invoice model
│   ├── EmailTemplate.js     # Email template model
│   ├── NotificationLog.js   # Notification logging
│   └── ...
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── leadRoutes.js        # Lead routes
│   ├── contactRoutes.js     # Contact routes
│   ├── dealRoutes.js        # Deal routes
│   ├── taskRoutes.js        # Task routes
│   ├── projectRoutes.js     # Project routes
│   ├── invoiceRoutes.js     # Invoice routes
│   └── ...
├── services/
│   └── NotificationService.js # Notification service
├── utils/
│   ├── notificationTriggers.js # Notification triggers
│   ├── pdfGenerator.js      # PDF generation utilities
│   └── ...
└── server.js                # Main server file
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd delight360-crm-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   
   # Database
   MONGO_URI=mongodb://localhost:27017/delight360-crm
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=30d
   
   # Email Configuration (Gmail SMTP)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_specific_password
   
   # Twilio Configuration
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   
   # Redis Configuration
   REDIS_URL=redis://localhost:6379
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/v1/auth/register          # Register new user
POST   /api/v1/auth/login             # User login
GET    /api/v1/auth/me                # Get current user
PUT    /api/v1/auth/updatedetails     # Update user details
PUT    /api/v1/auth/updatepassword    # Update password
POST   /api/v1/auth/forgotpassword    # Forgot password
PUT    /api/v1/auth/resetpassword/:token # Reset password
GET    /api/v1/auth/logout            # Logout user
```

### Lead Management
```
GET    /api/v1/leads                  # Get all leads
POST   /api/v1/leads                  # Create new lead
GET    /api/v1/leads/stats            # Get lead statistics
GET    /api/v1/leads/:id              # Get single lead
PUT    /api/v1/leads/:id              # Update lead
DELETE /api/v1/leads/:id              # Delete lead
POST   /api/v1/leads/:id/activities   # Add activity to lead
POST   /api/v1/leads/:id/notes        # Add note to lead
POST   /api/v1/leads/:id/convert      # Convert lead to contact/deal
```

### Contact Management
```
GET    /api/v1/contacts               # Get all contacts
POST   /api/v1/contacts               # Create new contact
GET    /api/v1/contacts/:id           # Get single contact
PUT    /api/v1/contacts/:id           # Update contact
DELETE /api/v1/contacts/:id           # Delete contact
POST   /api/v1/contacts/:id/activities # Add activity to contact
POST   /api/v1/contacts/:id/notes     # Add note to contact
```

### Deal Pipeline
```
GET    /api/v1/deals                  # Get all deals
POST   /api/v1/deals                  # Create new deal
GET    /api/v1/deals/stats            # Get deal statistics
GET    /api/v1/deals/:id              # Get single deal
PUT    /api/v1/deals/:id              # Update deal
DELETE /api/v1/deals/:id              # Delete deal
POST   /api/v1/deals/:id/activities   # Add activity to deal
POST   /api/v1/deals/:id/notes        # Add note to deal
```

### Task Management
```
GET    /api/v1/tasks                  # Get all tasks
POST   /api/v1/tasks                  # Create new task
GET    /api/v1/tasks/:id              # Get single task
PUT    /api/v1/tasks/:id              # Update task
DELETE /api/v1/tasks/:id              # Delete task
POST   /api/v1/tasks/:id/comments     # Add comment to task
```

### Project Management
```
GET    /api/v1/projects               # Get all projects
POST   /api/v1/projects               # Create new project
GET    /api/v1/projects/:id           # Get single project
PUT    /api/v1/projects/:id           # Update project
DELETE /api/v1/projects/:id           # Delete project
POST   /api/v1/projects/:id/team      # Add team member
DELETE /api/v1/projects/:id/team/:userId # Remove team member
```

### Invoice System
```
GET    /api/v1/invoices               # Get all invoices
POST   /api/v1/invoices               # Create new invoice
GET    /api/v1/invoices/:id           # Get single invoice
PUT    /api/v1/invoices/:id           # Update invoice
DELETE /api/v1/invoices/:id           # Delete invoice
POST   /api/v1/invoices/:id/send      # Send invoice via email
GET    /api/v1/invoices/:id/download  # Download invoice PDF
GET    /api/v1/invoices/:id/public    # Get public invoice link
```

### Email Templates
```
GET    /api/v1/email-templates        # Get all templates
POST   /api/v1/email-templates        # Create new template
GET    /api/v1/email-templates/:id    # Get single template
PUT    /api/v1/email-templates/:id    # Update template
DELETE /api/v1/email-templates/:id    # Delete template
```

### Notifications
```
GET    /api/v1/notifications          # Get notification logs
POST   /api/v1/notifications/send     # Send notification
GET    /api/v1/notifications/stats    # Get notification statistics
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Granular permissions system
- **Data Sanitization**: MongoDB injection prevention
- **XSS Protection**: Cross-site scripting prevention
- **Rate Limiting**: API abuse prevention
- **CORS Configuration**: Cross-origin request security
- **Helmet Security**: HTTP header security
- **Input Validation**: Comprehensive input validation

## 🔔 Notification System

The system includes a comprehensive notification system with:

### Email Notifications
- Welcome emails for new users
- Lead assignment notifications
- Deal status updates
- Task reminders and overdue alerts
- Invoice delivery and payment reminders
- Project updates and milestone notifications

### SMS & WhatsApp
- Critical alerts and reminders
- Two-factor authentication codes
- Urgent task notifications
- Payment reminders

### Queue Processing
- Reliable delivery with retry mechanisms
- Background processing for performance
- Delivery status tracking
- Failed notification handling

## 📊 Dashboard & Analytics

- Real-time business metrics
- Lead conversion tracking
- Sales pipeline analytics
- Task completion rates
- Revenue forecasting
- Team performance metrics

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set in production:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
# ... other production variables
```

### Production Considerations
- Use a process manager like PM2
- Set up SSL/TLS certificates
- Configure reverse proxy (Nginx)
- Set up monitoring and logging
- Configure backup strategies
- Implement CI/CD pipelines

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@delight360.biz
- Documentation: https://docs.delight360.biz
- Issues: Create an issue in the repository

## 🔄 Version History

- **v1.0.0**: Initial release with core CRM features
- **v1.1.0**: Added notification system and email templates
- **v1.2.0**: Enhanced invoice system with PDF generation
- **v1.3.0**: Added project management and advanced analytics

---

Built with ❤️ by the Delight360 Team