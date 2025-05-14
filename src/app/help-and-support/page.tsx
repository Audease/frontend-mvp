"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HelpAndSupport = () => {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Example FAQ data
  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      faqs: [
        {
          question: "How do I create an account?",
          answer:
            "Create an account by visiting our landing page, scheduling a demo, or contacting our team at support@audease.co.uk",
        },
        {
          question: "What are the system requirements?",
          answer:
            "Our platform works best on modern browsers like Chrome, Firefox, Safari, and Edge. We recommend using the latest version of these browsers for optimal performance.",
        },
        {
          question: "Is there a free trial available?",
          answer:
            "Yes! We offer a 14-day free trial with access to all features. No credit card is required to start your trial. You can upgrade to a paid plan at any time during or after your trial period.",
        },
      ],
    },
    {
      id: "account-settings",
      title: "Account Settings",
      faqs: [
        {
          question: "How do I change my password?",
          answer:
            'To change your password, go to "Account Settings" in your profile dropdown. Select the "Password" tab and click on "Change Password". You\'ll need to enter your current password and then your new password twice to confirm.',
        },
        {
          question: "Can I update my email address?",
          answer:
            "Yes, you can update your email address by reaching out to our support team. Please provide your current email address and the new email address you wish to use. We will send a confirmation link to your new email for verification.",
        },
        // {
        //   question: 'How do I cancel my subscription?',
        //   answer: 'To cancel your subscription, go to "Account Settings" and select the "Subscription" tab. Click on "Cancel Subscription" and follow the prompts. You\'ll still have access to your account until the end of your current billing period.'
        // }
      ],
    },
    {
      id: "billing",
      title: "Billing & Payments",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through our payment gateway partners.",
        },
        {
          question: "How do I get an invoice for my purchase?",
          answer:
            'Invoices are automatically generated and sent to your registered email address when a payment is processed. You can also find all your invoices in the "Billing History" section of your account dashboard.',
        },
        {
          question: "Can I change my billing cycle?",
          answer:
            'Yes, you can switch between monthly and annual billing cycles. Go to "Account Settings" > "Subscription" and select "Change Plan". Note that switching to annual billing usually comes with a discount.',
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      faqs: [
        {
          question: "The app is running slowly. What can I do?",
          answer:
            "Try clearing your browser cache and cookies, ensure you're using a supported browser version, and close unnecessary browser tabs or applications. If problems persist, try accessing from a different device or network to isolate the issue.",
        },
        {
          question: "I've forgotten my password",
          answer:
            "Click on the \"Forgot Password\" link on the login page. Enter your registered email address, and we'll send you a password reset link. The link is valid for 24 hours. If you don't receive the email, check your spam folder.",
        },
        {
          question: "Why can't I upload files?",
          answer:
            "File upload issues may be related to file size (maximum 10MB), file type restrictions, or temporary server issues. Try compressing your file, checking that the file format is supported, or trying again later. If the problem persists, contact our support team.",
        },
      ],
    },
    {
      id: "privacy-security",
      title: "Privacy & Security",
      faqs: [
        {
          question: "How is my data protected?",
          answer:
            "We use industry-standard encryption protocols to secure all data transmission. Your data is stored on secure servers with multiple layers of protection, including firewalls and regular security audits. We never share your personal information with third parties without your consent.",
        },
        {
          question: "Can I request my data to be deleted?",
          answer:
            'Yes, under GDPR and other privacy regulations, you have the right to request deletion of your personal data. Contact our support team or go to "Privacy Settings" in your account to initiate a data deletion request. We\'ll process your request within 30 days.',
        },
        {
          question: "Do you use cookies?",
          answer:
            'Yes, we use essential cookies to ensure the basic functionality of our website and analytical cookies to improve our service. You can manage your cookie preferences in the "Privacy Settings" section or through the cookie banner that appears when you first visit our site.',
        },
      ],
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., send to an API
    alert("Your message has been sent! We'll get back to you shortly.");
    setShowContactForm(false);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const filteredFaqs = searchQuery
    ? faqCategories.flatMap((category) =>
        category.faqs
          .filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((faq) => ({ ...faq, category: category.title }))
      )
    : [];

  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen font-switzer">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Image
          width={132}
          height={37}
          src="/audease_logo.png"
          alt="Audease logo"
          className="mx-auto mb-4"
        />

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Help & Support
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to frequently asked questions, troubleshooting guides,
            and support resources to help you get the most out of Audease.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help topics..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Search Results{" "}
                {filteredFaqs.length > 0 ? `(${filteredFaqs.length})` : ""}
              </h2>

              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-4 last:border-0"
                    >
                      <p className="text-xs text-blue-600 mb-1">
                        {faq.category}
                      </p>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-600 mb-2">
                    No results found for &quot;{searchQuery}&quot;
                  </p>
                  <p className="text-gray-500 text-sm">
                    Try different keywords or browse our categories below
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <h2 className="font-bold text-gray-700 mb-4 text-lg">
                Help Categories
              </h2>
              <nav>
                <ul className="space-y-2">
                  {faqCategories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm ${
                          activeCategory === category.id
                            ? "bg-dashboardButtons/10 text-dashboardButtons font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {category.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <a
                  href="mailto:hello@audease.co.uk"
                  className="text-dashboardButtons hover:text-tgrey1 text-sm font-medium"
                >
                  <button
                    // onClick={() => setShowContactForm(true)}
                    className="w-full bg-dashboardButtons hover:bg-tgrey1 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Contact Support
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* FAQ Sections */}
            {!showContactForm ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {faqCategories.map(
                  (category) =>
                    category.id === activeCategory && (
                      <div key={category.id} className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                          {category.title}
                        </h2>

                        <div className="space-y-6">
                          {category.faqs.map((faq, index) => (
                            <div
                              key={index}
                              className="border-b border-gray-200 pb-6 last:border-0"
                            >
                              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                {faq.question}
                              </h3>
                              <p className="text-gray-600">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                )}

                {/* Additional Resources */}
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Additional Resources
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 blur-[2px]">
                    <a
                      href="#"
                      className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <div className="p-2 bg-blue-50 rounded-full mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          User Guides
                        </h4>
                        <p className="text-sm text-gray-500">
                          Step-by-step instructions
                        </p>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <div className="p-2 bg-blue-50 rounded-full mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Video Tutorials
                        </h4>
                        <p className="text-sm text-gray-500">
                          Visual learning resources
                        </p>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <div className="p-2 bg-blue-50 rounded-full mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Webinars</h4>
                        <p className="text-sm text-gray-500">
                          Live training sessions
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Contact Support
                  </h2>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md mr-2 hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-dashboardButtons text-white rounded-md hover:bg-tgrey1 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Quick Support Options */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Email Support
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Get help from our support team within 24 hours
                    </p>
                    <a
                      href="mailto:support@audease.co.uk"
                      className="text-dashboardButtons hover:text-tgrey1 font-medium"
                    >
                      support@audease.co.uk
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                <div className="flex items-start">
                  <div className="p-2 bg-green-50 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Live Chat
                    </h3>
                    {/* <p className="text-gray-600 mb-3">Available Monday to Friday, 9am to 5pm GMT</p> */}
                    <p className="text-gray-600 mb-3">Coming Soon...</p>
                    {/* <button className="text-green-600 hover:text-green-800 font-medium">
                      Start Chat
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                Audease Ltd | Company Number 15502591
              </p>
              <p className="text-sm text-gray-500">
                25 Burdetts Road, Dagenham, RM9 6XZ, United Kingdom
              </p>
            </div>
            <div>
              <a
                href="mailto:hello@audease.co.uk"
                className="text-dashboardButtons hover:text-tgrey1 text-sm font-medium"
              >
                hello@audease.co.uk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
