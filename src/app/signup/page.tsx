export default function Signup() {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Sign Up for Bruce Leads</h1>
        <p className="text-gray-600">Create an account to access AI-powered B2B leads.</p>
        <form className="mt-6 flex flex-col">
          <input type="text" placeholder="Full Name" className="mb-4 px-4 py-2 border rounded" />
          <input type="email" placeholder="Email" className="mb-4 px-4 py-2 border rounded" />
          <input type="password" placeholder="Password" className="mb-4 px-4 py-2 border rounded" />
          <button className="px-6 py-2 bg-blue-500 text-white rounded">Sign Up</button>
        </form>
        <a href="/login" className="mt-4 text-blue-500">Already have an account? Log in</a>
      </div>
    );
  }
  