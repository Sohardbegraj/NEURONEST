// src/components/SignUpForm.tsx
import React, { useState } from "react";
import { Button } from "./Button";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// Zod schema with password match validation
const contentSchema = z
  .object({
    name: z.string().min(8, "Minimum of 8 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password too short"),
    confirmPassword: z.string().min(8, "Password too short"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ContentForm = z.infer<typeof contentSchema>;

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<ContentForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContentForm, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = contentSchema.safeParse(formData);
    if (!result.success) {
      const errors: Partial<Record<keyof ContentForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContentForm;
        errors[field] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    console.log("✅ Validated Data:", result.data);

    // Submit logic here
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    alert("Account created")
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4 shadow-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign-Up
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700 mb-1 block">Username</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 mb-1 block">Email</span>
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

        <label className="block mb-4">
          <span className="text-gray-700 mb-1 block">Password</span>
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

        <label className="block mb-6">
          <span className="text-gray-700 mb-1 block">Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
          )}
        </label>

        <Button
          variant="primary"
          size="large"
          label="Create Account"
          type="submit"
          onClick={()=>{handleSubmit}}
        />

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <button onClick={()=>navigate("/")} className="text-blue-600 cursor-pointer">
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
