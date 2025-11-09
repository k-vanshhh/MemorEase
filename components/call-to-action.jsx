import { Button } from "./ui/button.jsx"

export default function CallToAction() {
  return (
    <section className="py-20 bg-emerald-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-4xl font-bold">Ready to Create Something Meaningful?</h2>
        <p className="text-lg text-emerald-100">
          Join thousands of users discovering thoughtful, personalized gifts from talented artists worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg">Start Shopping</Button>
          <Button
            variant="outline"
            className="border-2 border-white text-white hover:bg-emerald-700 px-8 py-6 text-lg bg-transparent"
          >
            Join Our Community
          </Button>
        </div>
      </div>
    </section>
  )
}
