import * as z from 'zod'
import { loginSchema } from './auth.validation'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from '../../../slices/redux-slices/auth-api'
import { toast } from 'react-toastify'
import { setUserInfo } from '../../../slices/redux-slices/auth'
import { useEffect } from 'react'
import type { RootState } from '../../../slices/store/store'
import bg from '../../../assets/money.png'
import FormInput from '../../../constant/ui/FormInput'
import PasswordInput from '../../../constant/ui/PasswordInput'
import GlassCard from '../../../constant/ui/FormCard'
import Button from '../../../constant/ui/Button'

type FormInputs = z.infer<typeof loginSchema>

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormInputs>({ resolver: zodResolver(loginSchema) })

  const [login, { isLoading }] = useLoginMutation()
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)


  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await login(data).unwrap()
      dispatch(setUserInfo(res.data))
      reset();
      toast.success("Login successfully");

    } catch (err: any) {
      toast.error(err?.data?.message || err.message);
    }
  }

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "super_admin" || userInfo.role === 'admin') {
        navigate('/admin/dashboard')
        return
      }

      navigate('/admin');
    }
  }, [navigate, userInfo])

  return (
    <main className="min-h-screen flex flex-col md:flex-row  text-[#dee5ff] relative overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full bg-cyan-400/10 blur-[100px]" />

      <section className="hidden md:flex md:w-3/5 relative items-center justify-center overflow-hidden p-16">

        {/* Background Image */}
        <img
          src={bg}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="background"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#060e20] via-[#060e20]/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-xl">

          <h1
            className="text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent"
          >SwiftExChange
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Access high-speed currency exchange with a secure and modern system built for performance.
          </p>

        </div>
      </section>

      {/* form section */}
      <section className="flex-1 flex items-center justify-center px-6 py-12 z-10">
        <div className="w-full max-w-md">

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-gray-400 text-sm">
              Sign in to your secure trading environment
            </p>
          </div>

          <GlassCard className='p-8'>
            <form onSubmit={handleSubmit(submit)} className="space-y-6">

              {/* Email */}
              <div>
                <FormInput
                  label='Email'
                  type="email"
                  placeholder="Enter Your Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <PasswordInput
                  label='Password'
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

            </form>

          </GlassCard>
        </div>
      </section>

    </main>
  );
}

export default Login
