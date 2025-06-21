// src/components/SignInForm.tsx
import React, { useState } from "react";
import { Button } from "./Button";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define Zod schema
const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInData = z.infer<typeof signInSchema>;

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof SignInData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const result = signInSchema.safeParse(formData);

    if (!result.success) {
      const errors: Partial<Record<keyof SignInData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SignInData;
        errors[field] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    console.log("✅ Submitted:", result.data);

    await axios.post('http://localhost:3000/', {
      email: result.data.email,
      password: result.data.password,
    })
      .then(res => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token.replace("Bearer ", ""));
        console.log(res.data.token);
      navigate("/content");
      })
      .catch(err => {
      alert("error");
      console.error(err);
      });

    // Clear form
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 shadow-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign In
        </h2>

        <label className="block mb-4">
          <span className="block text-gray-700 mb-1">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </label>

        <label className="block mb-6">
          <span className="block text-gray-700 mb-1">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </label>

        <Button
          variant="primary"
          size="large"
          label="Sign In"
          type="submit"
          onClick={()=>{handleSubmit}}
          
        />

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <button onClick={()=>navigate("/signup")}  className="text-blue-600 cursor-pointer">Sign-up</button>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
