import { Button } from "../components/landingComponents/Button"
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"

export default function Contact() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-12">
          Have questions, suggestions, or feedback? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Email</h4>
              <p className="text-gray-600">mauryasiddharth14@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
              <p className="text-gray-600">+91 9870172547</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Location</h4>
              <p className="text-gray-600">DTU, Bawana Road, Shabad Daulatpur, Delhi</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Feedback & Suggestions</h3>
          <p className="text-gray-700 mb-6">
            We value your input. Please use the link below to leave us feedback or suggestions through our Google Form.
          </p>
          <a
            href="https://forms.gle/your-google-form-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="flex items-center gap-2">
              Fill Google Form <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
