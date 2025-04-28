// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import '../styles/Login.css';

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitError, setSubmitError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setSubmitError(null);
      const ok = await signup(data.username, data.password);
      if (ok) {
        navigate('/signin', {
          state: { message: 'Account created successfully. Please sign in.' }
        });
      } else {
        setSubmitError('Signup failed. Try a different username.');
      }
    } catch {
      setSubmitError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="main-content">
        <div className="login-container">
          <div className="star-icon">✦</div>
          <h1 className="login-header">Sign In</h1>

          {submitError && (
            <div style={{ marginBottom: '1rem', color: 'red', textAlign: 'center' }}>
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="form-control"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && (
                <p style={{ color: 'red', marginTop: '4px' }}>{errors.username.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'At least 6 characters' }
                  })}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  👁️
                </span>
              </div>
              {errors.password && (
                <p style={{ color: 'red', marginTop: '4px' }}>{errors.password.message}</p>
              )}
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading
                ? (
                  <svg className="animate-spin" style={{ height: 20, width: 20 }} viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                )
                : 'Create Account'
              }
            </button>
          </form>

          <div className="create-account">
            <span>Don't have an account?</span>{' '}
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
