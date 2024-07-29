import { useState } from 'react';
import { useFormData } from 'herotofu-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  // TODO - update to the correct endpoint
  const { formState, getFormSubmitHandler } = useFormData('https://public.herotofu.com/v1/48ff3b50-4d7a-11ef-8375-1b1d42270640');

  // State to manage form fields
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const submitHandler = getFormSubmitHandler();

    submitHandler(event).then(() => {
      // Show toast notification
      toast.success('Message sent');

      // Clear form fields
      setFormValues({
        name: '',
        email: '',
        message: ''
      });
    }).catch(() => {
      toast.error('Failed to send message');
    });
  };

  return (
    <>
      <div className="text-2xl font-bold">Contact Us</div>
      <div className="py-2">Got any queries? Reach out to us and we will get back to you very soon!</div>
      <form onSubmit={handleSubmit}>
        <div className="pt-0 mb-3">
          <input
            type="text"
            placeholder="Your name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
            required
          />
        </div>
        <div className="pt-0 mb-3">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
            required
          />
        </div>
        <div className="pt-0 mb-3">
          <textarea
            placeholder="Your message"
            name="message"
            value={formValues.message}
            onChange={handleInputChange}
            className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
            required
          />
        </div>
        <div className="pt-0 mb-3">
          <button
            className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default ContactForm;
