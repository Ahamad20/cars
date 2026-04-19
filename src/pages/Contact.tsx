import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full">
      <motion.div
        className="bg-slate-900 text-white py-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">Get in touch with our team</p>
        </div>
      </motion.div>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="bg-white p-8 rounded-lg shadow" variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <motion.div className="space-y-6" variants={containerVariants}>
                {[
                  { icon: '📍', title: 'Address', text: '123 Car Street, Auto City, AC 12345' },
                  { icon: '📞', title: 'Phone', text: '+1-800-CAR-DECOR' },
                  { icon: '📧', title: 'Email', text: 'info@cardecor.com' },
                  { icon: '⏰', title: 'Hours', text: 'Mon - Fri: 9AM - 6PM\nSat - Sun: 10AM - 4PM' },
                ].map((item, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <motion.h4 className="font-bold mb-2" whileHover={{ x: 5 }}>
                      <span className="text-2xl mr-2">{item.icon}</span>{item.title}
                    </motion.h4>
                    <p className="text-gray-600 whitespace-pre-line">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="bg-white p-8 rounded-lg shadow" variants={itemVariants}>
              {submitted ? (
                <motion.div
                  className="flex items-center justify-center h-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-5xl mb-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      ✅
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-gray-600">We'll get back to you soon.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form onSubmit={handleSubmit} variants={containerVariants} initial="hidden" animate="visible">
                  <h3 className="text-2xl font-bold mb-4">Send us a Message</h3>
                  <motion.div className="space-y-4" variants={containerVariants}>
                    {[
                      { name: 'name', placeholder: 'Your Name', type: 'text' },
                      { name: 'email', placeholder: 'Your Email', type: 'email' },
                      { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                    ].map((field) => (
                      <motion.div key={field.name} variants={itemVariants}>
                        <motion.input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                          required
                          whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(26, 115, 232, 0.1)' }}
                        />
                      </motion.div>
                    ))}
                    <motion.div variants={itemVariants}>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="inquiry">General Inquiry</option>
                        <option value="service">Service Booking</option>
                        <option value="product">Product Question</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <motion.textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary h-32 resize-none"
                        required
                        whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(26, 115, 232, 0.1)' }}
                      />
                    </motion.div>
                    <motion.button
                      type="submit"
                      className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition font-bold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variants={itemVariants}
                    >
                      Send Message
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
