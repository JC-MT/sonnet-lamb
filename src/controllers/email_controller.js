import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['name', 'email', 'subject', 'message'];

  connect() {
    this.loadEmailJs();
  }

  loadEmailJs() {
    const script = document.createElement('script');
    script.src = 'https://cdn.emailjs.com/dist/email.min.js';
    script.onload = () => {
      emailjs.init('rqJUEA6YrcT81oaSp');
    };
    document.head.appendChild(script);
  }

  createMessage(e) {
    e.preventDefault();
    const serviceID = 'service_wld21fn';
    const templateID = 'template_2z02asi';
    const templateParams = {
      user_name: this.nameTarget.value,
      user_email: this.emailTarget.value,
      message: `Subject: ${this.subjectTarget.value}- Message: ${this.messageTarget.value}`,
      reply_to: 'sayhello@sonnetlamb.com'
    };

    emailjs
      .send(serviceID, templateID, templateParams)
      .then((res) => {
        console.log('SUCCESS!', res.status, res.text);
        alert('Email successfully sent!');
      })
      .catch((error) => {
        console.log('FAILED...', error);
        alert('Failed to send the email.');
      });
  }
}
