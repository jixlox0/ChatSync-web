import { z } from 'zod'

export const CreateAccounSchema = z.object({
  first_name: z
    .string()
    .min(2, 'Minimum 2 characters need!')
    .max(256, 'Maximum 256 characters allowed')
    .nonempty(),
  last_name: z
    .string()
    .min(2, 'Minimum 2 characters need!')
    .max(256, 'Maximum 256 characters allowed')
    .nonempty(),
  user_name: z
    .string()
    .min(2, 'Minimum 2 characters need!')
    .max(256, 'Maximum 256 characters allowed')
    .regex(/^[a-z0-9_]+$/, 'Only lowercase characters,numbers,uppercase allowed')
    .nonempty(),
  email: z.string().email().nonempty(),
  password: z
    .string()
    .min(8, 'Minimum 8 characters need')
    .max(100, 'Only 100 characters allowed')
    .nonempty('Password required'),
})

export const LoginAccountSchema = z.object({
  email: z.string().email().nonempty(),
  password: z
    .string()
    .min(8, 'Minimum 8 characters need')
    .max(100, 'Only 100 characters allowed')
    .nonempty('Password required'),
})
