"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import Input from "../ui/input"
import toast from 'react-hot-toast';

const loginSchema = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(14, "CPF inválido")
    .refine((val) => /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(val), {
      message: "CPF inválido",
    }),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    toast.promise(
      login(data.cpf, data.password),
      {
        loading: 'Entrando...',
        success: <b>Login bem-sucedido!</b>,
        error: <b>CPF ou senha incorretos.</b>,
      }
    ).then(() => {
      router.push("/")
      router.refresh()
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="CPF"
        placeholder="000.000.000-00"
        name="cpf"
        type="text"
        register={register}
        value={watch("cpf")}
        errorMessage={errors.cpf?.message as string}
      />

      <Input
        label="Senha"
        placeholder="******"
        name="password"
        type="password"
        register={register}
        value={watch("password")}
        errorMessage={errors.password?.message as string}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  )
}

