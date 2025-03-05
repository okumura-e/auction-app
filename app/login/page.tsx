import { redirect } from "next/navigation"
import LoginForm from "@/components/loginForm"
import { useAuth } from "@/context/auth-context"

export default async function LoginPage() {
  // const user = localStorage.getItem("user")
  // console.log(user);

  // if (user) {
  //   redirect("/")
  // }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sistema de Leilão</h1>
          <p className="mt-2 text-gray-600">Faça login para continuar</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

