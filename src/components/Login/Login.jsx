import React, { useContext, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AiFillEyeInvisible, AiOutlineGithub, AiFillEye } from 'react-icons/ai'
import { ImGoogle2 } from 'react-icons/im'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import useTitle from '../../hooks/useTitle';

const Login = () => {
     useTitle('Login')
     const [error, setError] = useState('')
     const [success, setSuccess] = useState('')
     const [user, setUser] = useState('')
     const [passwordShown, setPasswordShown] = useState(false);
     const navigate = useNavigate()

     const location = useLocation()

     const from = location.state?.from?.pathname || '/';

     const { signIn, googlSignIn, githubSingIn, resetPassword } = useContext(AuthContext)

     const emailRef = useRef()

     // passwordShown function start 
     const [passwordIcon, setPasswordIcon] = useState(false)

     const togglePassword = () => {
          setPasswordShown(!passwordShown);
          setPasswordIcon(!passwordIcon)
     };
     // passwordShown function end

     // main form part start 
     const handelLogin = (event) => {
          event.preventDefault();
          setError('')
          setSuccess('')
          const form = event.target
          const email = form.email.value;
          const password = form.password.value;

          // Signed in part start
          signIn(email, password)
               .then((userCredential) => {
                    const currentUser = userCredential.user;
                    if (currentUser) {
                         Swal.fire({
                              title: 'Success!',
                              text: 'Login Success !!',
                              icon: 'success',
                              confirmButtonText: 'Ok'
                         })
                    }
                    form.reset()
                    navigate(from, { replace: true })
                    setSuccess('Sign in successFull')
               })
               .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage)
               });
          // Signed in part end
     }
     // main form part end

     // handelGoogleRegister part start
     const handelGoogleRegister = () => {
          googlSignIn()
               .then((result) => {
                    const user = result.user;
                    setUser(user)
                    Swal.fire({
                         title: 'Success!',
                         text: 'Login Success !!',
                         icon: 'success',
                         confirmButtonText: 'Ok'
                    })
                    navigate(from, { replace: true })
               }).catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage)
               });
     }
     // handelGoogleRegister part end

     // handelGitHubRegister part start 
     const handelGitHubRegister = () => {
          githubSingIn()
               .then((result) => {
                    const user = result.user;
                    setUser(user)
                    Swal.fire({
                         title: 'Success!',
                         text: 'Login Success !!',
                         icon: 'success',
                         confirmButtonText: 'Ok'
                    })
                    navigate(from, { replace: true })
               }).catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage)
               });
     }
     // handelGitHubRegister part end

     // Reset Password part start 
     const handelResetPassword = () => {
          const email = emailRef.current.value;
          if (!email) {
               alert('Please provide your email')
               return
          }

          resetPassword(email)
               .then(() => {
                    alert('Please check you email')
               })
               .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage)
               });

     }
     // Reset Password part end

     // console.log(user);
     return (
          <div className='mt-5'>
               <h1 className='my-5 text-center'>This is Login Page</h1>
               <div className=' col-lg-4  mx-auto'>
                    <Form onSubmit={handelLogin}>
                         <div className='border rounded px-5 py-4'>

                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                   <Form.Label>Email</Form.Label>
                                   <Form.Control type="email" name='email'
                                        placeholder="Email" required
                                        ref={emailRef} />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                   <Form.Label>Password</Form.Label>
                                   <div className='parentPasswordShow position-relative'>
                                        <div>
                                             <Form.Control type={passwordShown ? "text" : "password"} name='password' placeholder="Password"
                                                  required />
                                        </div>
                                        <div className='passwordShow position-absolute'>
                                             <p className=' fs-5' onClick={togglePassword} >{
                                                  passwordIcon ? <AiFillEye /> : <AiFillEyeInvisible />
                                             }</p>
                                        </div>
                                   </div>
                              </Form.Group>

                              <p className=' text-danger'>{error}</p>
                              <p className=' text-success'>{success}</p>
                              <div className="d-grid gap-2 mt-4">
                                   <Button variant="info" type="submit">
                                        Login
                                   </Button>
                                   <div>
                                        <small>Create your new Password?</small>
                                        <button onClick={handelResetPassword} className='btn btn-link'>Reset Password</button>
                                   </div>
                                   <div className="d-grid gap-2 mt-3 mb-2 col-9 mx-auto">
                                        <Button onClick={handelGoogleRegister} className="btn btn-success" type="button"> <span className=' fs-5 text-light'><ImGoogle2 /></span> Sign-in with Google</Button>
                                   </div>
                                   <div className="d-grid gap-2 mb-3 col-9 mx-auto">
                                        <Button onClick={handelGitHubRegister} className="btn btn-dark" type="button"> <span className=' fs-5 text-light'><AiOutlineGithub /></span> Sign-in with GitHub</Button>
                                   </div>
                                   <div>
                                        <small className='me-2'>Please are you now?</small>
                                        <Link to='/register'>Register</Link>
                                   </div>
                              </div>
                         </div>
                    </Form>
               </div>
          </div>
     );
};

export default Login;