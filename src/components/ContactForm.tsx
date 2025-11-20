import { useState, useEffect, type FormEvent } from 'react';
import './ContactForm.css';
import CustomSelect from './CustomSelect';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+4|0)[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Numele este obligatoriu';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Numele trebuie să conțină minim 3 caractere';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email-ul este obligatoriu';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email-ul nu este valid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonul este obligatoriu';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Număr de telefon invalid (ex: 0721234567 sau +40721234567)';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesajul este obligatoriu';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesajul trebuie să conțină minim 10 caractere';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 4000);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
    return;
  }, [isSubmitted]);

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Contactează-ne</h2>
        <p className="section-subtitle">Ai întrebări? Suntem aici să te ajutăm!</p>

        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nume complet *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Ion Popescu"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="exemplu@email.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefon *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="0721234567"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subiect</label>
              <CustomSelect
                name="subject"
                value={formData.subject}
                onChange={handleSubjectChange}
                options={[
                  { value: '', label: 'Alege un subiect' },
                  { value: 'informații', label: 'Informații generale' },
                  { value: 'rezervare', label: 'Rezervare tur' },
                  { value: 'sugestii', label: 'Sugestii' },
                  { value: 'reclamație', label: 'Reclamație' },
                  { value: 'altele', label: 'Altele' },
                ]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mesaj *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                rows={5}
                placeholder="Scrie mesajul tău aici..."
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-button">
              Trimite Mesaj
            </button>
          </form>
        </div>
        {isSubmitted && (
          <div className="success-overlay" role="dialog" aria-modal="true">
            <div className="success-overlay-box">
              <div className="success-overlay-check">✓</div>
              <h3>Mesajul tău a fost trimis cu succes!</h3>
              <p>Te vom contacta în curând.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
