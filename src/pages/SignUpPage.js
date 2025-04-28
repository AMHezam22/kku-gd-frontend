// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import '../styles/Login.css';

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [submitError, setSubmitError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setSubmitError(null);
      const ok = await signup(data.email, data.username, data.password);
      if (ok) {
        navigate('/signin', {
          state: { message: 'Account created successfully. Please sign in.' }
        });
      } else {
        setSubmitError('Signup failed. Try a different email or username.');
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
          <h1 className="login-header">Sign Up</h1>

          {submitError && (
            <div style={{ marginBottom: '1rem', color: 'red', textAlign: 'center' }}>
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Your email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder="Your username"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <p className="error">{errors.username.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Your password"
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
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-field">
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Your password"
                  {...register('confirmPassword', {
                    required: 'Please confirm password',
                    validate: value =>
                      value === getValues('password') || 'Passwords do not match'
                  })}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ cursor: 'pointer' }}
                >
                  👁️
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="terms"
                {...register('terms', { required: 'You must accept the terms' })}
              />
              <label htmlFor="terms">I accept the terms and privacy policy</label>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? '…' : 'Sign up'}
            </button>
          </form>

          <div className="create-account">
            <span>You already have account?</span>{' '}
            <Link to="/signin">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
