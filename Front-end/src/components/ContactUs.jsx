import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from './Navbar';

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Thank you for your message! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email',
      value: 'info@serpsentry.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Office',
      value: '123 SEO Street, Digital City',
      description: 'Visit us anytime'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Support Hours',
      value: '24/7 Available',
      description: 'We\'re here to help anytime'
    }
  ];

  const faqs = [
    {
      question: 'How does SERP Sentry work?',
      answer: 'SERP Sentry uses advanced algorithms to monitor your keyword rankings across multiple search engines and provides real-time updates and analytics.'
    },
    {
      question: 'What search engines do you support?',
      answer: 'We support Google, Bing, Yahoo, and other major search engines across different countries and languages.'
    },
    {
      question: 'How accurate are the ranking data?',
      answer: 'Our data is 99.9% accurate and is updated in real-time using multiple data sources and verification methods.'
    },
    {
      question: 'Can I track unlimited keywords?',
      answer: 'Yes! Our platform allows you to track unlimited keywords and projects with no restrictions.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <style>{`
        .bg-gradient-multi {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }
        .form-label {
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #6366f1;
        }
        .form-input {
          border: 1.5px solid #e5e7eb;
          border-radius: 6px;
          padding: 0.7rem 1rem;
          font-size: 1rem;
          background: #f9fafb;
          transition: border 0.2s;
        }
        .form-input:focus {
          border-color: #6366f1;
          outline: none;
          background: #fff;
        }
        .form-input.error {
          border-color: #ef4444;
        }
        .error-message {
          color: #ef4444;
          font-size: 0.95rem;
          margin-top: 0.2rem;
        }
        .btn-primary {
          background: linear-gradient(90deg, #6366f1 60%, #8b5cf6 100%);
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.8rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .btn-primary:hover {
          background: linear-gradient(90deg, #8b5cf6 60%, #6366f1 100%);
          transform: translateY(-2px) scale(1.03);
        }
        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #6366f1;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          animation: spin 1s linear infinite;
          margin-right: 0.5rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(99, 102, 241, 0.07);
          padding: 1.5rem 1.2rem;
          margin-bottom: 1rem;
        }
        .bg-gray-50 {
          background: #f9fafb;
        }
        .bg-gray-200 {
          background: #e5e7eb;
        }
        .bg-primary\/10 {
          background: rgba(99, 102, 241, 0.10);
        }
        .rounded-lg {
          border-radius: 12px;
        }
        .text-primary {
          color: #6366f1;
        }
        .text-success {
          color: #22c55e;
        }
        .w-full {
          width: 100%;
        }
        @media (max-width: 900px) {
          .container { padding: 0 1rem; }
        }
        @media (max-width: 600px) {
          .container { padding: 0 0.5rem; }
          .card { padding: 1rem 0.5rem; }
        }
      `}</style>
      {/* Hero Section */}
      <section className="bg-gradient-multi py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Have questions about SERP Sentry? We're here to help you succeed with your SEO monitoring needs.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mobile-form tablet-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className={`form-input touch-target ${errors.firstName ? 'error' : ''}`}
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName.message}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className={`form-input touch-target ${errors.lastName ? 'error' : ''}`}
                      {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName.message}</span>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-input touch-target ${errors.email ? 'error' : ''}`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select
                    className={`form-input touch-target ${errors.subject ? 'error' : ''}`}
                    {...register('subject', { required: 'Subject is required' })}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <span className="error-message">{errors.subject.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    rows="5"
                    className={`form-input touch-target ${errors.message ? 'error' : ''}`}
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <span className="error-message">{errors.message.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full mobile-btn tablet-btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-gray-600">{info.value}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Why Choose SERP Sentry?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-gray-700">24/7 Customer Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-gray-700">99.9% Uptime Guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-gray-700">Free Setup & Training</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-gray-700">30-Day Money Back</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about SERP Sentry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-600">
              Come say hello at our office HQ
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive Map Coming Soon</p>
              <p className="text-sm text-gray-500 mt-2">
                123 SEO Street, Digital City, DC 12345
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;