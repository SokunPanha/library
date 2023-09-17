import { z } from "zod"

export interface FormType {
  fields: {
    label: string
    type: string
    value?: string
    id?: string
    className?: string
    rules?: any
  }[],
  onSubmit: (data: any) => void,
  children: React.ReactNode
}

export const UserRegiterType = z.object({
  username: z.string().min(1).max(200),
  email: z.string().email("it is not email format"),
  password: z.string().min(6).max(100)
})



export const patternOfStrengthPassword = [
  {
    regx: /^(?=.*[a-z])/, label: "Password must contain at least one lowercase letter", isComplete: true, index: 0
  },
  {
    regx: /^(?=.*[A-Z])/, label: "Password must contain at least one uppercase letter", isComplete: true, index: 1
  },
  {
    regx: /^(?=.*\d)/, label: "Password must contain at least one number", isComplete: true, index: 2
  },
  {
    regx:/[~!@#$%^&*()_±={}[]|:;<>?\/.,]/, label: "Password must contain at least one special character", isComplete: true, index: 3
}, {
  regx: /^.{8,}$/, label: "Password must be at least 8 characters long", isComplete: true, index: 4
}

]